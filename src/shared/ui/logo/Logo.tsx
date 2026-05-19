import styles from './Logo.module.scss';

type LogoOptions = 'default' | 'compact';

type Props = {
  option?: LogoOptions;
};

export const Logo: React.FC<Props> = ({ option = 'default' }) => {
  const isCompact = option === 'compact';

  const correctLogo = isCompact 
  ? 'src/img/icons/favicon.svg'
  : "src/img/logo.svg";

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