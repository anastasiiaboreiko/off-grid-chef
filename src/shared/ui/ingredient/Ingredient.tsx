import type React from "react";

import styles from './Ingredient.module.scss';
import type { IngredientType } from "../../types/Recipe";
import { memo } from "react";

type Props = {
  ingredient: IngredientType;
  isChecked: boolean;
  onToggle: (ingredientId: number) => void;
}

export const Ingredient: React.FC<Props> = memo(({ ingredient, isChecked, onToggle }) => {
  return (
    <li className={styles.ingredient} key={ingredient.id}>
      <div className={styles.ingredient__item}>
        <label className={styles.firstPart}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(ingredient.id)}
            className={styles.firstPart__input}
          />
          <p className={`body-text ${styles.firstPart__name}`}>
            {ingredient.name}
          </p>
        </label>

        <p className={`body-text ${styles.secondPart}`}>{`${ingredient.quantity} ${ingredient.unit}`}</p>
      </div>
    </li>
  );
});
