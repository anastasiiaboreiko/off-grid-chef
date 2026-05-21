import { useEffect, useState } from "react";
import styles from './CartPage.module.scss';
import type { CartItem } from "../../shared/types/CartItem";
import { Loader } from "../../shared/ui/loader";
import { getCartItems } from "../../shared/api/apiCart";
import cartItemImage from "../../img/cartImage_2.png";
import { NoResults } from "../../shared/ui/noResults";
import { useLocation } from "react-router-dom";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const loadCartItems = async () => {
      const accessToken = localStorage.getItem('accessToken');
    
      if (!accessToken) {
        setError('There is no authorised user.');
        return;
      };
      setIsLoading(true);

      try {
        const result = await getCartItems(accessToken);
        setCartItems(result);
      } catch {
        setError(`Can't add items to the cart.`);
      } finally {
        setIsLoading(false);
      }
    }
    void loadCartItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cart</h1>
        <button 
          type="button"
          className={`body-text ${styles.header__button}`}
        >
          Clear cart
        </button>
      </div>
      

      {isLoading && <Loader />}
      {!isLoading && error && (
        <p>Something went wrong</p>
      )}

      {!isLoading && !error && cartItems.length > 0 && (
        <div className={styles.content}>
          <ul className={styles.cartList}>
            {cartItems.map(cartItem => (
              <li className={styles.listItem} key={cartItem.id}>
                <div className={styles.listItem__firstBlock}>
                  <img 
                    className={styles.listItem__itemImage}
                    src={cartItemImage} 
                    alt="cart item image" 
                  />
                
                  <p className={`body-text ${styles.listItem__name}`}>
                    {cartItem.ingredient_name}
                  </p>
                </div>
                <p className={`main-text ${styles.listItem__quantity}`}>
                  {cartItem.quantity} {cartItem.unit}
                </p>
                <button 
                  type="button"
                  className={styles.listItem__deleteButton}
                  aria-label="Remove item"
                >
                  <span 
                    className={styles.listItem__deleteIcon}
                    aria-hidden="true"
                  />
                </button>  
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p className={`body-text ${styles.footer__text}`}>
              {`${cartItems.length} products`}
            </p>
            <button 
              type="button"
              className={`button-text ${styles.footer__button}`}
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {!isLoading && !error && cartItems.length === 0 && (
        <NoResults pathname={pathname} /> 
      )}
      
    </div>
   
  );
}