import styles from './CloseButton.module.scss';

type Props = {
  onClose: () => void;
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
}

export const CloseButton = ({ 
  onClose, 
  className = '', 
  iconClassName = '', 
  ariaLabel = 'Close',
}: Props) => {
  return (
    <button 
      type="button"
      onClick={onClose}
      className={`${styles.closeButton} ${className}`}
      aria-label={ariaLabel}
    >
      <span className={`${styles.closeButton__icon} ${iconClassName}`} />
    </button>
  )
}