import { useContext, useState } from "react";
import styles from './OrderModal.module.scss';
import type { CartItemType } from "../../../../shared/types/CartItemType";
import { BackButton } from "../../../../shared/ui/buttons/backButton/BackButton";
import { NextButton } from "../../../../shared/ui/buttons/nextButton";
import { PlaceOrderButton } from "../../../../shared/ui/buttons/placeOrderButton";
import { AuthContext } from "../../../../shared/context/AuthContext";
import { OrderList } from "../../../../shared/ui/orderList";
import { CartButton } from "../../../../shared/ui/buttons/cartButton";
import { CloseButton } from "../../../../shared/ui/buttons/closeButton";
import type { OrderFormData } from "../../../../shared/types/OrderFormData";
import { MyInformationFields } from "../../../../shared/ui/forms/myInformationFields";
import { DeliveryInformationFields } from "../../../../shared/ui/forms/deliveryInformationFields";
import { ArrowOpen } from "../../../../shared/ui/buttons/arrowOpen";

type Props = {
  onClose: () => void;
  cartItems: CartItemType[];
  onOrderSuccess: () => void;
}

type OrderStep = 'myInfo' | 'delivery' | 'confirm';
const orderSteps: OrderStep[] = ['myInfo', 'delivery', 'confirm'];

export const OrderModal = ({ onClose, cartItems, onOrderSuccess }: Props) => {
  const [isOrderListOpen, setIsOrderListOpen] = useState(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OrderStep>('myInfo');

  const { user } = useContext(AuthContext);
 
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    full_name: user?.full_name || '',
    email: user?.email || '',
    country_code: '+380',
    phone_number: '',
    city: '',
    street: '',
    home: '',
    entrance: '',
    apartment: '',
    comment: '',
  })

  const isFullNameValid = orderForm.full_name.trim().length > 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderForm.email.trim());
  const isCountryCodeValid = orderForm.country_code.trim().length > 0;
  const isPhoneNumberValid = orderForm.phone_number.replace(/\D/g, '').length === 9;
  

  const isMyInfoStepValid = 
    isFullNameValid &&
    isEmailValid &&
    isCountryCodeValid &&
    isPhoneNumberValid;

  const isDeliveryStepValid =
    orderForm.city.trim() !== '' &&
    orderForm.street.trim() !== '' &&
    orderForm.home.trim() !== '';

  const isNextButtonDisabled = currentStep === 'myInfo' 
    ? !isMyInfoStepValid
    : !isDeliveryStepValid;

  const stepTitles: Record<OrderStep, string> = {
    myInfo: 'My information',
    delivery: 'Delivery information',
    confirm: 'Confirm order',
  }

  const currentStepIndex = orderSteps.indexOf(currentStep);

  const handleNextStepChange = () => {
    if (currentStep === 'myInfo') {
      setCurrentStep('delivery');
    };

    if (currentStep === 'delivery') {
      setCurrentStep('confirm');
    };
  };

  const handleBackStepChange = () => {
    if (currentStep === 'delivery') {
      setCurrentStep('myInfo');
    };
    if (currentStep === 'confirm') {
      setCurrentStep('delivery');
    }
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setOrderForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (value: OrderFormData['country_code']) => {
    setOrderForm(prev => ({
      ...prev,
      country_code: value,
    }));
  };

  const handlePlaceOrder = () => {
    setOrderForm({
      full_name: user?.full_name || '',
      email: user?.email || '',
      country_code: '+380',
      phone_number: '',
      city: '',
      street: '',
      home: '',
      entrance: '',
      apartment: '',
      comment: '',
    });

    onOrderSuccess();
  }

  const handleSubmit = () => {};

  return (
    <div className={styles.orderModal}>
      <header className={styles.orderModal__header}>
        <h1>Place Order</h1>
        <CloseButton onClose={onClose}/>
      </header>
      <main className={styles.orderModal__main}>
        <div className={styles.orderDetails}>
          <div className={styles.orderDetails__top}>
            <div className={styles.progress}>
              {orderSteps.map((step, index) => (
                <span 
                  key={step}
                  className={`
                    ${styles.progress__item}
                    ${index <= currentStepIndex 
                      ? styles.progress__item_active 
                      : ''
                    }
                  `}
                />
              ))}
            </div>
            <h3 className={styles.title}>{stepTitles[currentStep]}</h3>
            <CartButton isOpen={() => setIsOrderListOpen(true)}/>
          </div>
          
          <div className={styles.orderDetails__content}>
            <form 
              onSubmit={handleSubmit}
              className={styles.form}
            >
              {currentStep === 'myInfo' && (
                <MyInformationFields 
                  onChange={handleChange}
                  onCountryCodeChange={handleCountryCodeChange}
                  orderForm={orderForm}
                />
              )}

              {currentStep === 'delivery' && (
                <DeliveryInformationFields 
                  onChange={handleChange}
                  orderForm={orderForm}
                />
              )}

              {currentStep === 'confirm' && (
                <div className={styles.confirm}>
                  <div 
                    className={styles.confirm__header}
                    onClick={() => setIsMyInfoOpen(prev => !prev)}
                  >
                    <p className={`secondary-text ${styles.confirm__subtitle}`}>
                      My information
                    </p>
                    <ArrowOpen isArrowOpen={isMyInfoOpen} />
                  </div>
                  {isMyInfoOpen && (
                    <MyInformationFields 
                      onChange={handleChange}
                      onCountryCodeChange={handleCountryCodeChange}
                      orderForm={orderForm}
                    />
                  )}

                  <div 
                    className={styles.confirm__header}
                    onClick={() => setIsDeliveryOpen(prev => !prev)}
                  >
                    <p className={`secondary-text ${styles.confirm__subtitle}`}>
                      Delivery information
                    </p>
                    <ArrowOpen isArrowOpen={isDeliveryOpen} />
                  </div>
                  {isDeliveryOpen && (
                    <DeliveryInformationFields 
                      onChange={handleChange}
                      orderForm={orderForm}
                    />
                  )}

                </div>
              )}
              
            </form >
          </div>

          <div className={styles.orderDetails__bottom}>
            {(currentStep === 'delivery' || currentStep === 'confirm') && (
              <BackButton onClick={handleBackStepChange} />
            )}
            
            {(currentStep === 'myInfo' || currentStep === 'delivery') 
              ? (
                <NextButton 
                  onNext={handleNextStepChange}
                  disabled={isNextButtonDisabled}
                />
              ) : (
                <PlaceOrderButton onClick={handlePlaceOrder} />
              )
            }
          </div>
          
        </div>

        <OrderList 
          isOpen={isOrderListOpen} 
          onToggle={() => setIsOrderListOpen(prev => !prev)}
          cartItems={cartItems}
        />
      </main>
    </div>
  )
}