import type React from "react";
import type { Recipe } from "../../types/Recipe";
import styles from './ComplexityDetails.module.scss';


type Props = {
  recipe: Recipe;
}

const renderComplexity = (recipe: Recipe) => {
  switch (recipe.complexity) {
    case 'easy':
      return (
        <>
          <span className={styles.complexity__icon_active} />
          <span className={styles.complexity__icon} />
          <span className={styles.complexity__icon} />
        </>
      );

    case 'medium':
      return (
        <>
          <span className={styles.complexity__icon_active} />
          <span className={styles.complexity__icon_active} />
          <span className={styles.complexity__icon} />
        </>
      );

    case 'hard':
      return (
        <>
          <span className={styles.complexity__icon_active} />
          <span className={styles.complexity__icon_active} />
          <span className={styles.complexity__icon_active} />
        </>
      );

    default:
      return null;
  }
};

export const ComplexityDetails: React.FC<Props> = ({ recipe }) => {
  return (
    <div className={styles.complexity}>
      {renderComplexity(recipe)}
    </div>
  );
};
