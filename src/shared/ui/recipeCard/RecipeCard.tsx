import { Link } from "react-router-dom";
import type { Recipe } from "../../types/Recipe";
import styles from './RecipeCard.module.scss';
import { PowerDetails } from "../powerDetails/PowerDetails";
import { ComplexityDetails } from "../complexityDetails/ComplexityDetails";
import { FavoriteButton } from "../buttons/favoriteButton/FavoriteButton";
import { TimeDetails } from "../timeDetails/TimeDetails";
import placeholderImage from "../../../img/placeholder.svg";

type Props= {
  recipe: Recipe;
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>

      <Link 
        to={`/recipes/${recipe.id}`} 
        className={styles.cardLink}
      >
        <div className={styles.pictureBlock}>
          <img
            className={styles.pictureBlock__picture}
            src={recipe.image_url ?? placeholderImage}
            alt={recipe.title}
          />

          <div className={styles.pictureBlock__specs}>
            <TimeDetails recipe={recipe}/>
            <FavoriteButton recipeId={recipe.id} />
          </div>
        
        </div>
        <div className={styles.textBlock}>
          <h4 className={styles.textBlock__title}>{recipe.title}</h4>
          <p className={`main-text ${styles.textBlock__description}`}>{`${recipe.description.split('.')[0]}.`}</p>
        </div>

      </Link>

      <div className={styles.detailsBlock}>
        <PowerDetails recipe={recipe} />
        <ComplexityDetails recipe={recipe}/>
      </div>

    </div>
  );
}
