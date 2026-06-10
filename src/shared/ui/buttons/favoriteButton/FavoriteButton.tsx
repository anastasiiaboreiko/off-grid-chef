import { useContext } from 'react';
import { FavoritesContext } from '../../../context/FavoritesContextStore';
import styles from './FavoriteButton.module.scss';

type Props = {
  recipeId: number;
};

export const FavoriteButton: React.FC<Props> = ({ recipeId }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFav = favorites.includes(recipeId);

  return (
    <button
      className={styles.favorite}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
    >
      <span
        className={isFav ? styles.favorite__icon_active : styles.favorite__icon}
        aria-hidden="true"
      />
    </button>
  );
}
