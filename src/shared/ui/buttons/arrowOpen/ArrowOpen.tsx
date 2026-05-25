import styles from './ArrowOpen.module.scss';

type Props = {
  isArrowOpen: boolean;
}

export const ArrowOpen = ({ isArrowOpen }: Props) => {
  return (
    <img
      src="src/img/icons/arrow-down.svg"
      alt="arrow"
      className={`
        ${styles.arrow}
        ${isArrowOpen ? styles.arrowOpen : ''}
      `}
    />
  )
}