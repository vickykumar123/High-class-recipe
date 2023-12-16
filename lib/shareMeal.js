"use server";

import { redirect } from "next/navigation";
import { insertMeal } from "./getMeals";
import { revalidatePath } from "next/cache";

function isInValid(meal) {
  return !meal || meal.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    creator_email: formData.get("email"),
    creator: formData.get("name"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    instructions: formData.get("instructions"),
  };

  if (
    isInValid(meal.title) ||
    isInValid(meal.creator) ||
    isInValid(meal.creator_email) ||
    isInValid(meal.summary) ||
    isInValid(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image
  ) {
    return {
      message: "Invalid input",
    };
  }
  await insertMeal(meal);
  revalidatePath("/", "layout");
  redirect("/meals");
}
