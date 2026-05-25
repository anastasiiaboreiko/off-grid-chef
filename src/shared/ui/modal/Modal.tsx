import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  
  if (!modalRoot) {
    return null;
  }

  return createPortal(
  // what to render 
    // dark background / onclick it should close the modal
    <div className={styles.overlay} onClick={onClose}> 
      {/* modal window / stopPropagation - in order not to close the modal with a click on it */}
      <div 
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    // where to render
    modalRoot,
  );
}