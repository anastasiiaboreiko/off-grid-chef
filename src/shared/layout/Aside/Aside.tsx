import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Aside.module.scss';
import { Logo } from "../../ui/logo/Logo";
import { useDeviceType } from "../../hooks/useDeviceType";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Aside: React.FC<Props> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet } = useDeviceType();
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout =  async () => {
    await logout();
    navigate('/auth');
  }

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <aside 
      className={`
        ${styles.sidebar}
        ${isSidebarOpen ? styles.sidebar__open : ''}
      `}
    >
      <header className={styles.sidebar__header}>
        {!isMobile && (
          <button
            type="button"
            className={styles.sidebar__toggle}
            onClick={handleSidebarToggle}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={isSidebarOpen}
          >
            <Logo 
              option={isTablet && !isSidebarOpen ? 'compact' : 'default'} 
            />
          </button>
        )}
      </header>

      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__list}>
          <li 
            className={styles.sidebar__item}
            onClick={handleSidebarToggle}
          >
            <NavLink 
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? styles.sidebar__activeLink 
                  : styles.sidebar__link
              } 
              >
              <span className={styles.sidebar__iconHome} />
              <h4 className={styles.sidebar__title}>Home</h4>
            </NavLink>
          </li>

          <li 
            className={styles.sidebar__item}
            onClick={handleSidebarToggle}
          >
            <NavLink 
              to="/cart"
              className={({ isActive }) => 
                isActive 
                  ? styles.sidebar__activeLink 
                  : styles.sidebar__link
              } 
            >
              <span className={styles.sidebar__iconCart} />
              <h4 className={styles.sidebar__title}>Cart</h4>
            </NavLink>
          </li>
          <li 
            className={styles.sidebar__item}
            onClick={handleSidebarToggle}
          >
            <NavLink 
              to="/favorites"
              className={({ isActive }) => 
                isActive 
                  ? styles.sidebar__activeLink 
                  : styles.sidebar__link
              } 
            >
              <span className={styles.sidebar__iconFavorite} />
              <h4 className={styles.sidebar__title}>Favorite</h4>
            </NavLink>
          </li>
        </ul>
      </nav>


      <footer className={styles.sidebar__footer}>
        {isOpen && (!isTablet || isSidebarOpen) && (
          <div className={styles.logout}>
            <button  
              type='button'
              className={styles.logout__button} 
              onClick={handleLogout}
            >
              <p className={`body-text`}>Logout</p>
              <span className={styles.logout__icon} aria-hidden="true"/>
            </button>
          </div>
        )}
        

        <div className={styles.user}>
          <span 
            className={styles.user__icon} 
            onClick={handleSidebarToggle}
          />
            <p className={`body-text ${styles.user__name}`}>{user?.full_name}</p>
            <span 
              className={`
                ${styles.user__arrow} 
                ${!isOpen ? styles.user__arrow_open : ''}
              `} 
              onClick={handleClick}
            />
        </div>
        
      </footer>
    </aside>
  );
};
