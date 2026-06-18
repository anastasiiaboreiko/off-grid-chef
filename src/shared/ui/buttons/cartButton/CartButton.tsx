import styles from './CartButton.module.scss';

type Props = {
  onOpen: () => void;
}

export const CartButton = ({ onOpen }: Props) => {
  return (
    <button
      type="button"
      className={styles.cartButton}
      onClick={onOpen}
    >
      <span className={styles.cartButton__icon} />
    </button>
  )
}
