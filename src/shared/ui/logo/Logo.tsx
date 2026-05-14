import styles from './Logo.module.scss';

type Props = {
  // correctLogo?: string;
  isTablet?: boolean,
  isSidebarOpen?: boolean,
};

export const Logo: React.FC<Props> = ({ isSidebarOpen, isTablet }) => {
  const correctLogo = isTablet && !isSidebarOpen 
  ? 'src/img/icons/favicon.svg'
  : "src/img/logo.svg";

  return (
    <img 
      src={correctLogo}
      className={`
        ${styles.logo}
        ${isSidebarOpen ? styles.logo__open : ''}
      `} 
      alt="logo"
    />
  )
}