// import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const db = sql("meals.db");
export async function getMeals() {
  return db.prepare("SELECT * from meals").all();
}

export function getMeal(slug) {
  // return db.prepare('SELECT * from meals WHERE slug=' + slug).get() // this will cause sql injection attack
  return db.prepare("SELECT * from meals WHERE slug= ?").get(slug); //
}

export async function insertMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const imageExtension = meal.image.name.split(".")[1];
  const imageName = `${meal.slug}${Date.now()}.${imageExtension}`;

  // writing the image to folder
  // const stream = fs.createWriteStream(`public/images/${imageName}`);
  // const bufferedImage = await meal.image.arrayBuffer();
  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("Saving the image failed....");
  //   }
  // });

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "highclass-food-nextjs-project",
    Key: imageName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = imageName;
  db.prepare(
    `
    INSERT INTO meals ( slug,
      title,
      image,
      summary,
      instructions,
      creator,
      creator_email) VALUES ( @slug,
        @title,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
        )
  `
  ).run(meal);
}

export function deleteMeal(slug) {
  revalidatePath("/meals", "layout");
  return db.prepare("DELETE from meals WHERE slug= ?").run(slug);
}
