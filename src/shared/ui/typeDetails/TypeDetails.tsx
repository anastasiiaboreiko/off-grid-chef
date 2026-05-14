import type React from "react";
import type { Recipe } from "../../types/Recipe";
import styles from './TypeDetails.module.scss';

type Props = {
  recipe: Recipe;
}

export const TypeDetails: React.FC<Props> = ({ recipe }) => {
  return (
    <div className={`main-text ${styles.type}`}>
      {recipe.type_of_dish.charAt(0).toUpperCase() + recipe.type_of_dish.slice(1)}
    </div>
  );
}