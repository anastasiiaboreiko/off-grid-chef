import { useContext } from 'react';
import { RecipesContext } from '../../shared/context/RecipesContext';
import { FavoritesContext } from '../../shared/context/FavoritesContextStore';
import { RecipeList } from '../../shared/ui/recipeList';
import { NoResults } from '../../shared/ui/noResults';
import styles from './FavoritesPage.module.scss';
import { useLocation } from "react-router-dom";

export const FavoritesPage = () => {
  const { recipes } = useContext(RecipesContext);
  const { favorites } = useContext(FavoritesContext);
  const location = useLocation();
  const pathname = location.pathname;

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className={styles.favotites}>
      <h1 className={styles.title}>Favorite</h1>
      
      {favoriteRecipes.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} />
      ) : (
        <NoResults pathname={pathname} />
      )}
    </div>
  );
};
