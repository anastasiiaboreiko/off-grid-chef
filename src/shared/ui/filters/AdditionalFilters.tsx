import { useState } from "react";
import styles from './AdditionalFilters.module.scss';
import arrowDownIcon from '../../../img/icons/arrowDown.svg';

type FilterOption = {
  value: string
  label: string
}

type Filter = {
  key: string,
  name: string,
  value: string,
  options: FilterOption[],
}

const addFilters: Filter[] = [
  {
    key: 'type',
    name: 'Type of dish',
    value: 'breakfast',
    options: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
    ],
  },
  {
    key: 'time',
    name: 'Cooking time',
    value: '15',
    options: [
      { value: '15', label: 'up to 15 min' },
      { value: '30', label: 'up to 30 min' },
      { value: '60', label: 'up to 1 hour' },
    ]
  },

  {
    key: 'complexity',
    name: 'Complexity',
    value: 'easy',
    options: [
      { value: 'easy', label: 'easy' },
      { value: 'medium', label: 'medium' },
      { value: 'hard', label: 'hard' },
    ]
  }
]

export const AdditionalFilters = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  return (
    <div className={styles.additionalFilters}>
      {addFilters.map(filter => (
        <div>
          <p className={styles.title} key={filter.key}>
          {filter.name}
        </p>
        <div className={styles.selectWrapper}>
        <div 
           className={styles.select}
           onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={styles.value}>
            {filter.options.find(option => option.value === filter.value)?.label}
          </span>

          <img
            src={arrowDownIcon}
            alt="arrow"
            className={isOpen ? styles.arrowOpen : styles.arrow}
          />
        </div>

        {isOpen && (
          <ul className={styles.dropdown}>
            {filter.options.map(option => (
              <li
                key={option.value}
                onClick={() => {setIsOpen(false)}}
                className={styles.listItem}
              >
                {option.label}
              </li>
            ))}
          </ul>
        
        )}
        </div>
        </div>
      ))}
    </div>
  );
};
