import styles from './CartButton.module.scss';

type Props ={ 
  isOpen: () => void;
}

export const CartButton = ({ isOpen }: Props) => {
  return (
    <button 
      type="button" 
      className={styles.cartButton}
      onClick={isOpen}
    >
      <span className={styles.cartButton__icon} />
    </button>
  )
}