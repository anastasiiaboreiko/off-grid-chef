export type RecipeCategory = 'with_light' | 'no_light';
export type DishType = 'breakfast' | 'lunch' | 'dinner';
export type Complexity = 'easy' | 'medium' | 'hard';

export type Instruction = {
  id: number;
  recipe_title: string;
  text: string;
};

export type IngredientType = {
  id: number;
  name: string;
  quantity: number;
  unit: IngredientUnit;
  image: string;
};

export type IngredientUnit =
  | 'pcs'
  | 'g'
  | 'kg'
  | 'ml'
  | 'l';

export type Recipe = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: RecipeCategory;
  type_of_dish: DishType;
  cooking_time: number;
  image: string; 
  complexity: Complexity;
  view_count: number;
  instructions: Instruction[];
  ingredients: IngredientType[];
};