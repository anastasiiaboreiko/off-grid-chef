import styles from './NoResults.module.scss';

type Props = {
  pathname: string;
}

export const NoResults: React.FC<Props> = ({ pathname }) => {
  const isFavoritePage = pathname === '/favorites';
  const isCartPage = pathname === '/cart';
  const isRecipeListPage = pathname === '/';

  return (
    <div className={styles.container}>
      {(isFavoritePage || isCartPage) && (
        <>
          <span 
            className={isFavoritePage 
              ? `${styles.favoriteIcon} ${styles.icon}`
              : `${styles.cartIcon} ${styles.icon}`
            } 
            aria-hidden="true"
          />
    
          <p className={`body-text ${styles.title}`}>
            {isFavoritePage 
              ? 'Favorite is empty'
              : 'Cart is empty'
            }
          </p>
          <p className={`small-text ${styles.subTitle}`}>
            {isFavoritePage
              ? 'Add the best recipes from "Home"'
              : 'Add products from "Recipe"'
            }
          </p>
        </>
      )}

      {isRecipeListPage && (
        <p className={`body-text ${styles.title}`}>Sorry, there are no suitable recipes matching your filters.</p>
      )}
  
    </div>
  );
};
