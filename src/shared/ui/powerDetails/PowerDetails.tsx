import type React from "react";
import type { Recipe } from "../../types/Recipe";
import styles from './PowerDetails.module.scss';

type Props = {
  recipe: Recipe;
};

export const PowerDetails: React.FC<Props> = ({ recipe }) => {
  const powerStatus = recipe.category;
  
  return (
    <div className={styles.power}>
      <span 
        className={powerStatus === 'no_light' 
          ? styles.power__iconNoLight
          : styles.power__iconLight
        } 
        aria-hidden="true"
      />
      <p className={`main-text ${styles.power__title}`}>
        {powerStatus === 'no_light'
          ? 'Without power'
          : 'With power'
      }
      </p>
    </div>
  );
}
