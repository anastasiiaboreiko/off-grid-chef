import { useEffect, useRef, useState } from "react";
import type { FilterComplexity } from "../../../types/FilterComplexity";
import styles from './FilterByComplexity.module.scss';
import { ArrowOpen } from "../../buttons/arrowOpen";

type Props = {
  value: FilterComplexity;
  onChange: (value: FilterComplexity) => void;
}

const options: { value: FilterComplexity; label: string }[] = [
  { value: 'all', label: 'All options' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export const FilterByComplexity: React.FC<Props> = ({ value, onChange }) => {
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
    <p className={`body-text ${styles.title}`}>Complexity</p>
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
};
