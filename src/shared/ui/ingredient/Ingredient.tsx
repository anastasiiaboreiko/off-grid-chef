import type React from "react";

import styles from './Ingredient.module.scss';
import type { IngredientType } from "../../types/Recipe";

type Props = {
  ingredient: IngredientType;
  isChecked: boolean;
  onToggle: (ingredientId: number) => void;
}

export const Ingredient: React.FC<Props> = ({ ingredient, isChecked, onToggle }) => {
  return (
    <li className={styles.ingredient} key={ingredient.id}>
      <div className={styles.ingredient__item}>
        <div className={styles.firstPart}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(ingredient.id)}
            className={styles.firstPart__input}
          />
          <p className={`body-text ${styles.firstPart__name}`}>
            {ingredient.name}
          </p>
        </div>
        
        <p className={`body-text ${styles.secondPart}`}>{`${ingredient.quantity} ${ingredient.unit}`}</p>
      </div>
    </li>
  );
}
