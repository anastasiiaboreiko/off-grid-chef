import styles from './PlaceOrderButton.module.scss';

type Props = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const PlaceOrderButton = ({ onClick, type = 'button' }: Props) => {
  return (
    <button 
      type={type}
      className={`button-text ${styles.button}`}
      onClick={onClick}
    >
      Place Order
    </button>
  )
}