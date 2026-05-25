import type { CartItemType } from "../../types/CartItemType";
import { ArrowOpen } from "../buttons/arrowOpen";
import { OrderCartItem } from "../orderCartItem";
import styles from './OrderList.module.scss';

type Props = { 
  isOpen: boolean;
  cartItems: CartItemType[];
  onToggle: () => void
}

export const OrderList = ({ cartItems, isOpen, onToggle }: Props) => {
  return (
    <div 
      className={`
        ${styles.orderList}
        ${isOpen ? styles.orderList__open : ''}
      `}>
      <div 
        className={styles.orderList__head}
        onClick={onToggle}
      >
        <h4 className={styles.orderList__title}>
          Your order
        </h4>
        <ArrowOpen isArrowOpen={isOpen} />
      </div>
      
      {isOpen && cartItems && (
        <ul className={styles.orderList__list}>
        {cartItems.map(cartItem => (
          <OrderCartItem key={cartItem.id} cartItem={cartItem}/>
        ))}
        </ul>
      )}
    </div>
  )
}