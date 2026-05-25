import styles from './ArrowOpen.module.scss';
import arrowDownIcon from '../../../../img/icons/arrow-down.svg';

type Props = {
  isArrowOpen: boolean;
}

export const ArrowOpen = ({ isArrowOpen }: Props) => {
  return (
    <img
      src={arrowDownIcon}
      alt="arrow"
      className={`
        ${styles.arrow}
        ${isArrowOpen ? styles.arrowOpen : ''}
      `}
    />
  )
}
