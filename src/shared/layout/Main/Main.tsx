import { Outlet} from 'react-router-dom';
import styles from './Main.module.scss';
import { Logo } from "../../ui/logo/Logo";
import { useDeviceType } from "../../hooks/useDeviceType";
import { BackButton } from "../../ui/buttons/backButton/BackButton";

type Props = {
  isSidebarOpen: boolean;
  onBurgerClick: () => void;
};

export const Main: React.FC<Props> = ({ isSidebarOpen, onBurgerClick }) => {
  const { isMobile } = useDeviceType();

  return (
    <div className={styles.main}>
      {isMobile && (
        <div className={styles.main__header}>
          {/* {isRecipeDetailesPage && <BackButton />} */}
          <BackButton />
          <Logo />
          <button
            type="button"
            className={`
              ${styles.main__burgerMenu}
              ${isSidebarOpen ? styles.main__close : ''}
            `}
            onClick={onBurgerClick}
            aria-label="Open menu"
          />
        </div>
      )}
      
      <div className={styles.main__content}>
        <Outlet />
      </div>

      {isMobile && (
         <div className={styles.main__footer}></div>
      )}
      
    </div>
  )
};
