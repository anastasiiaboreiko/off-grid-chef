import styles from './OrderCartItem.module.scss';
import cartItemImage from "../../../img/cartImage_2.png";
import type { CartItemType } from "../../types/CartItemType";

type Props = {
  cartItem: CartItemType;
}

export const OrderCartItem = ({ cartItem }: Props) => {
  return (
    <li className={styles.listItem}>
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
    </li>
  )
}