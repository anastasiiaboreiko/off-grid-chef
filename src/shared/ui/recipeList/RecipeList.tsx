import { memo } from "react";
import type { Recipe } from "../../types/Recipe";
import { RecipeCard } from "../recipeCard";
import styles from './RecipeList.module.scss';

type Props = {
  recipes: Recipe[];
};

export const RecipeList: React.FC<Props> = memo(({ recipes }) => {
  return (
    <div className={styles.recipeList}>
      {recipes.map(recipe => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
});
