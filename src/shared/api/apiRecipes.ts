import type { Recipe } from "../types/Recipe";
import placeholderImage from "../../img/placeholder.svg";

const API_URL = import.meta.env.VITE_API_URL;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getRecipes(): Promise<Recipe[]> {
  await wait(500);

  const response = await fetch(`${API_URL}/catalog/recipes/`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data: Recipe[] = await response.json();

  return data.map(recipe => ({
    ...recipe,
    image: recipe.image_url || placeholderImage
  }));
}
