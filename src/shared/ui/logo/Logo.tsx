import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import favicon from '../../../img/icons/favicon.svg';
import logo from '../../../img/logo.svg';

type LogoOptions = 'default' | 'compact';

type Props = {
  option?: LogoOptions;
};

export const Logo: React.FC<Props> = ({ option = 'default' }) => {
  const isCompact = option === 'compact';

  const correctLogo = isCompact ? favicon : logo;

  return (
    <Link to="/" className={styles.logo} aria-label="Go to home page">
      <img
        src={correctLogo}
        className={`
          ${isCompact ? styles.logo__compact : styles.logo__default}
        `}
        alt="logo"
      />
    </Link>
  );
}
