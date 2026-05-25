import styles from './NextButton.module.scss';

type Props = {
  onNext: () => void;
  disabled?: boolean;
}

export const NextButton = ({ onNext, disabled = false }: Props) => {
  return (
    <button 
      type="button"
      onClick={onNext}
      className={`button-text ${styles.button}`}
      disabled={disabled}
    >
      Next
    </button>
  )
}