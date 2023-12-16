import Link from "next/link";
import style from "./page.module.css";
import MealGrid from "@/components/meals/MealGrid";
import { getMeals } from "@/lib/getMeals";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

async function MealLoading() {
  const meals = await getMeals();
  revalidatePath("/meals", "layout");
  return <MealGrid meals={meals} />;
}

export default async function Meals() {
  return (
    <>
      <header className={style.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it for yourself 😍. Its easy and
          fun
        </p>
        <p className={style.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={style.main}>
        <Suspense fallback={<p className={style.loading}>Loading...</p>}>
          <MealLoading />
        </Suspense>
      </main>
    </>
  );
}
