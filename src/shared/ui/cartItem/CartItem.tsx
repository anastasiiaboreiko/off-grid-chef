import type { CartItemType } from "../../types/CartItemType";
import styles from './CartItem.module.scss';
// import cartItemImage from "../../../img/cartImage_2.png";

type Props = {
  cartItem: CartItemType;
  onDelete: (cartItemId: number) => void;
}

export const CartItem = ({ cartItem, onDelete }: Props) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItem__firstBlock}>
        <img 
          className={styles.listItem__itemImage}
          src={cartItem.image} 
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
        onClick={() => onDelete(cartItem.id)}
      >
        <span 
          className={styles.listItem__deleteIcon}
          aria-hidden="true"
        />
      </button>  
    </li>
  )
}