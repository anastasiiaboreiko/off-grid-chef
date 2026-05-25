import styles from './OrderSuccessModal.module.scss';

type Props = {
  onClose: () => void;
}

const generateOrderNumber = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const OrderSuccessModal = ({ onClose }: Props) => {
  const randomOrderNumber = generateOrderNumber();

  return (
    <div className={styles.successModal}>
      <div className={styles.successModal__top}>
        <div className={styles.successModal__image}>
          <span className={styles.successModal__image_icon}/>
        </div>
      </div>
      <p className={`secondary-text ${styles.successModal__text}`}>
        Order 
        <strong className={styles.successModal__text_bold}>#{randomOrderNumber}</strong> 
        has been received!
        <br/>
        Thank you for choosing our service
      </p>

      <button 
        type="button" 
        onClick={onClose}
        className={`button-text ${styles.successModal__button}`}
      >
        Ok
      </button>
    </div>
  )

}