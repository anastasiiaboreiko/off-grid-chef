import styles from './BackButton.module.scss';

type Props = {
  onClick: () => void;
  isHidden?: boolean;
  className?: string;
}

export const BackButton = ({ onClick, isHidden = false, className = '' }: Props) => {
  return (
    <button 
      type="button"
      className={`
        ${styles.backButton}
        ${isHidden ? styles.backButton__hidden : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <span className={styles.backButton__icon} />
      <p className={`button-text ${styles.backButton__title}`}>Back</p>
    </button>
  )
}