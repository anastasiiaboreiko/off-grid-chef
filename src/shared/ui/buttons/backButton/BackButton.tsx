import { useMatch, useNavigate } from "react-router-dom";
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const isRecipeDetailesPage = Boolean(useMatch('/recipes/:recipeId'))

  return (
    <button 
      type="button"
      className={`
        ${styles.backButton}
        ${!isRecipeDetailesPage ? styles.backButton__hidden : ''}
      `}
      onClick={() => {navigate('/')}}
    >
      <span className={styles.backButton__icon} />
      <p className={`button-text ${styles.backButton__title}`}>Back</p>
    </button>
  )
}