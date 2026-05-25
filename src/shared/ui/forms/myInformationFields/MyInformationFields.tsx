import type { OrderFormData } from "../../../types/OrderFormData";
import { CounrtyCodeSelect } from "../countryCodeSelect";
import styles from './MyInformationFields.module.scss';

type Props = {
  orderForm: OrderFormData;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCountryCodeChange: (value: OrderFormData['country_code']) => void;
}

export const MyInformationFields = ({ 
  orderForm, 
  onChange,
  onCountryCodeChange,
}: Props) => {
  return (
    <fieldset className={styles.myInfo}>
      <label className={`main-text ${styles.myInfo__label}`}>
        Full Name
        <input 
          className={`body-text ${styles.myInfo__input}`}
          type="text" 
          name="full_name"
          value={orderForm.full_name}
          onChange={onChange}
          placeholder="Albert Flores"
        />
      </label>

      <label className={`main-text ${styles.myInfo__label}`}>
        Email
        <input 
          className={`body-text ${styles.myInfo__input}`}
          type="email" 
          name="email"
          value={orderForm.email}
          placeholder="al.flores@gmail.com"
          onChange={onChange}
        />
      </label>

      <label 
        className={`main-text ${styles.myInfo__label}`}
      >
        Mobile phone
        <div className={styles.myInfo__mobilePhone}>
          <CounrtyCodeSelect 
            value={orderForm.country_code} 
            onChange={onCountryCodeChange}
          />
          <input 
            className={`body-text ${styles.myInfo__input}`}
            type="text" 
            name="phone_number"
            value={orderForm.phone_number}
            onChange={onChange}
            placeholder="XX XXX XXXX"
          />
        </div>
      
        </label>
    </fieldset>
  )
}