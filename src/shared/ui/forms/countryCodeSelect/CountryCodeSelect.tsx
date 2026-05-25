import { useEffect, useRef, useState } from "react";
import styles from './CountryCodeSelect.module.scss';
import { ArrowOpen } from "../../buttons/arrowOpen";

type CountryCode = "+380" | "+48" | "+49" | "+33";

type Props = {
  value: string;
  onChange: (value: CountryCode) => void;
};

const options: { value: CountryCode; label: string }[] = [
  { value: "+380", label: "UK +380" },
  { value: "+48", label: "PL +48" },
  { value: "+49", label: "GR +49" },
  { value: "+33", label: "FR +33" },
];

export const CounrtyCodeSelect = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(event.target as Node) 
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <button
        type="button"
        className={styles.select}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={`body-text ${styles.value}`}>
          {value}
        </span>
        <ArrowOpen isArrowOpen={isOpen} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={`body-text ${styles.listItem}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};