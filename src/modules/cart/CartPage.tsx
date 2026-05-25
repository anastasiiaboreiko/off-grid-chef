import { useEffect, useState } from "react";
import styles from './CartPage.module.scss';
import type { CartItemType } from "../../shared/types/CartItemType";
import { Loader } from "../../shared/ui/loader";
import { deleteAllCartItems, deleteCartItem, getCartItems } from "../../shared/api/apiCart";

import { NoResults } from "../../shared/ui/noResults";
import { useLocation } from "react-router-dom";
import { Modal } from "../../shared/ui/modal";
import { OrderModal } from "./components/OrderModal";
import { CartItem } from "../../shared/ui/cartItem";
import { PlaceOrderButton } from "../../shared/ui/buttons/placeOrderButton";
import { OrderSuccessModal } from "./components/OrderSuccessModal";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  const handleOrderSuccess = () => {
    setIsOrderModalOpen(false);
    setIsSuccessModalOpen(true);
  }

  const handleDeleteCartItem = async (cartItemId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('There is no authorised user.');
      return;
    }

    try {
      await deleteCartItem(accessToken, cartItemId);

      setCartItems(prev =>
        prev.filter(item => item.id !== cartItemId)
      );
    } catch {
      setError('Failed to delete cart item.');
    }
  };

  const handleDeleteAllCartItems = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('There is no authorised user.');
      return;
    }

    try {
      await deleteAllCartItems(accessToken);
      setCartItems([]);
    } catch {
      setError('Failed to clear cart.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cart</h1>
        <button 
          type="button"
          className={`body-text ${styles.header__button}`}
          onClick={handleDeleteAllCartItems}
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
              <CartItem
                cartItem={cartItem}
                key={cartItem.id}
                onDelete={handleDeleteCartItem}
              />
            ))}
          </ul>
          <div className={styles.footer}>
            <p className={`body-text ${styles.footer__text}`}>
              {`${cartItems.length} products`}
            </p>
            <PlaceOrderButton onClick={() => setIsOrderModalOpen(true)}/>
          </div>
        </div>
      )}

      {!isLoading && !error && cartItems.length === 0 && (
        <NoResults pathname={pathname} /> 
      )}

      {isOrderModalOpen && (
        <Modal onClose={() => setIsOrderModalOpen(false)}>
          <OrderModal 
            cartItems={cartItems}
            onClose={() => setIsOrderModalOpen(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        </Modal>
      )}

      {isSuccessModalOpen && (
        <Modal onClose={() => setIsSuccessModalOpen(false)}>
          <OrderSuccessModal onClose={() => setIsSuccessModalOpen(false)}/>
        </Modal>
      )}
    </div>
  );
}
