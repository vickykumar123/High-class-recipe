import { revalidatePath } from "next/cache";
import style from "./page.module.css";
import { deleteMeal, getMeal } from "@/lib/getMeals";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Delete({ params }) {
  const meal = getMeal(params.deleteSlug);
  if (!meal) {
    notFound();
  }
  deleteMeal(params.deleteSlug);
  revalidatePath("/meals", "layout");
  return (
    <div>
      <header className={style.header}>
        <div className={style.image}>
          <Image
            src={`https://highclass-food-nextjs-project.s3.ap-south-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <h2 className={style.delete}>
          Successfully Deleted the meal -- {params.deleteSlug}
        </h2>
      </header>

      <p className={style.cta}>
        <Link href="/meals" replace>
          Go back to all Meals
        </Link>
      </p>
    </div>
  );
}
