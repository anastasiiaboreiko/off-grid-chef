import type { Recipe } from "../../types/Recipe";
import styles from './TimeDetails.module.scss';

type Props = {
  recipe: Recipe;
};

export const TimeDetails: React.FC<Props> = ({ recipe })  => {
  return (
    <div className={styles.time}>
      <span 
        className={styles.time__icon} 
        aria-hidden="true"
      />
      <p className={`main-text`}>{recipe.cooking_time}m</p>
    </div>
  );
}