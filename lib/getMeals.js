import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

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
  const imageName = `${meal.slug}-${Date.now()}.${imageExtension}`;

  // writing the image to public
  const stream = fs.createWriteStream(`public/images/${imageName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving the image failed....");
    }
  });
  meal.image = `/images/${imageName}`;
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
  return db.prepare("DELETE from meals WHERE slug= ?").run(slug);
}
