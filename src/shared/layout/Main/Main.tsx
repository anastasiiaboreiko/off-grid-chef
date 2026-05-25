import { Outlet, useMatch, useNavigate} from 'react-router-dom';
import styles from './Main.module.scss';
import { Logo } from "../../ui/logo/Logo";
import { useDeviceType } from "../../hooks/useDeviceType";
import { BackButton } from "../../ui/buttons/backButton/BackButton";
import { CloseButton } from "../../ui/buttons/closeButton";

type Props = {
  isSidebarOpen: boolean;
  onBurgerClick: () => void;
};

export const Main: React.FC<Props> = ({ isSidebarOpen, onBurgerClick }) => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  const isRecipeDetailsPage = Boolean(useMatch('/recipes/:recipeId'));

  return (
    <div className={styles.main}>
      {isMobile && (
        <div className={styles.main__header}>
          
          <BackButton 
            onClick={() => navigate('/')}
            isHidden={!isRecipeDetailsPage}
          />
          <Logo />
          {isSidebarOpen 
            ? (
              <CloseButton 
                onClose={onBurgerClick}
                ariaLabel="Close menu"
              />
            ) : (
              <button
                type="button"
                className={styles.main__burgerMenuButton}
                onClick={onBurgerClick}
                aria-label="Open menu"
              >
                <span className={styles.main__burgerMenuIcon} />
              </button>
            )
          }
         
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
