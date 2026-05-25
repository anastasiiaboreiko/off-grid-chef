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
    <img 
      src={correctLogo}
      className={`
        ${styles.logo}
        ${isCompact ? styles.logo__compact : styles.logo__default}
      `} 
      alt="logo"
    />
  )
}
