import Image from "next/image";
import style from "./page.module.css";
import { getMeal } from "@/lib/getMeals";
import { notFound } from "next/navigation";

export default function MealPage({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={style.header}>
        <div className={style.image}>
          <Image
            src={`https://highclass-food-nextjs-project.s3.ap-south-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={style.headerText}>
          <h1>{meal.title}</h1>
          <p className={style.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={style.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={style.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        >
          {/* {meal.instructions} */}
        </p>
      </main>
    </>
  );
}
