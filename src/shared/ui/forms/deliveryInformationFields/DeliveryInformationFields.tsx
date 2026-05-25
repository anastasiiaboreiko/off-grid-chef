import type { OrderFormData } from "../../../types/OrderFormData";
import styles from './DeliveryInformationFields.module.scss';

type Props = {
  orderForm: OrderFormData;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DeliveryInformationFields = ({ orderForm, onChange }: Props) => {
  return (
    <fieldset className={styles.delivery}>
      <div className={styles.delivery__line}>
        <label 
          className={`
            main-text 
            ${styles.delivery__label}
            ${styles.delivery__label_city}
          `}
        >
          City
          <input 
            className={`body-text ${styles.delivery__input}`}
            type="text" 
            name="city"
            value={orderForm.city}
            onChange={onChange}
            placeholder="Kyiv"
          />
        </label>

        <label 
          className={`
            main-text 
            ${styles.delivery__label}
            ${styles.delivery__label_street}
          `}
        >
          Street
          <input 
            className={`body-text ${styles.delivery__input}`}
            type="text" 
            name="street"
            value={orderForm.street}
            placeholder="T. Shevchenka"
            onChange={onChange}
          />
        </label>
      </div>
    
      <div className={styles.delivery__line}>
        <label className={`main-text ${styles.delivery__label}`}>
          Home
          <input 
            className={`body-text ${styles.delivery__input}`}
            type="text" 
            name="home"
            value={orderForm.home}
            onChange={onChange}
            placeholder="4"
          />
        </label>

        <label className={`main-text ${styles.delivery__label}`}>
          Entrance
          <input 
            className={`body-text ${styles.delivery__input}`}
            type="text" 
            name="entrance"
            value={orderForm.entrance}
            onChange={onChange}
            placeholder="2"
          />
        </label>

        <label className={`main-text ${styles.delivery__label}`}>
          Apartment
          <input 
            className={`body-text ${styles.delivery__input}`}
            type="text" 
            name="apartment"
            value={orderForm.apartment}
            onChange={onChange}
            placeholder="33"
          />
        </label>
      </div>
    

      <label className={`main-text ${styles.delivery__label}`}>
        Comment (Optional)
        <textarea 
          className={`body-text ${styles.delivery__textarea}`}
          name="comment"
          value={orderForm.comment}
          onChange={onChange}
          placeholder="Comments for curier"
        />
      </label>
    </fieldset>
  )
}