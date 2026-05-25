import { useEffect, useRef, useState } from "react";
import type { FilterType } from "../../../types/FilterType";
import styles from './FilterByType.module.scss';
import { ArrowOpen } from "../../buttons/arrowOpen";

type Props = {
  value: FilterType;
  onChange: (value: FilterType) => void;
};

const options: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All options' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
];

export const FilterByType: React.FC<Props> = ({ value, onChange }) => {
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
      <p className={`body-text ${styles.title}`}>Type of dish</p>
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