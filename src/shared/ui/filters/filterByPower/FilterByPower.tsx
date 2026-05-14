import styles from './FilterByPower.module.scss';
import type { FilterPower } from "../../../types/FilterPower";

type Props = {
  value: FilterPower;
  onChange: (value: FilterPower) => void;
};

export const FilterByPower: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.filter_power}>
      <p className={`{ body-text ${styles.title}`}>Can be cooked</p>
      <div className={styles.buttons}>
        <button 
          type="button"
          className={`body-text ${styles.button} ${value === 'all' ? styles.active : ''}`}
          onClick={() => onChange('all')}
        >
          All
        </button>
        <button 
          type="button"
          className={`body-text ${styles.button} ${value === 'with_light' ? styles.active : ''}`}
          onClick={() => onChange('with_light')}
        >
          With Power
        </button>
        <button 
          type="button"
          className={`body-text ${styles.button} ${value === 'no_light' ? styles.active : ''}`}
          onClick={() => onChange('no_light')}
        >
          Without Power
        </button>
      </div>
    </div>
  );
};
