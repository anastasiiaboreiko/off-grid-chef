import { useEffect, useRef, useState } from "react";
import type { FilterTime } from "../../../types/FilterTime";
import styles from './FilterByTime.module.scss';
import { ArrowOpen } from "../../buttons/arrowOpen";

type Props = {
  value: FilterTime;
  onChange: (value: FilterTime) => void;
}

const options: { value: FilterTime; label: string }[] = [
  { value: 'all', label: 'All options' },
  { value: '15', label: '15 min' },
  { value: '30', label: '15-30 min' },
  { value: '60', label: '30-60 min' },
];

export const FilterByTime: React.FC<Props> = ({ value, onChange }) => {
  const [isArrowOpen, setIsArrowOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsArrowOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div className={styles.filter}>
      <p className={`body-text ${styles.title}`}>Cooking time</p>
      <div className={styles.selectWrapper} ref={selectRef}>
        <div 
           className={styles.select}
           onClick={() => setIsArrowOpen(prev => !prev)}
        >
          <span className={`body-text ${styles.value}`}>
            {options.find(option => option.value === value)?.label}
          </span>

          <ArrowOpen isArrowOpen={isArrowOpen} />
        </div>

        {isArrowOpen && (
          <ul className={styles.dropdown}>
            {options.map(option => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsArrowOpen(false);
                }}
                className={`body-text ${styles.listItem}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}