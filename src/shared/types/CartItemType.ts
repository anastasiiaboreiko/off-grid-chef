import type { Recipe, IngredientType } from "./Recipe";

export type CartItemType = {
  id: number;
  recipe: Recipe['id'];
  recipe_title: Recipe['title'];
  ingredient: IngredientType['id'];
  ingredient_name: IngredientType['name'];
  quantity: IngredientType['quantity'];
  unit: IngredientType['unit'];
  image: IngredientType['image'];
}