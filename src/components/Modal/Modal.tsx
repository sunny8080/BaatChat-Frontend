import './Modal.scss';
import type { ReactNode } from 'react';

type Props = {
  handleOverlayClick: () => void;
  children: ReactNode;
};

const Modal = ({ handleOverlayClick, children }: Props) => {
  return (
    <div className="bc-Modal">
      <div className="bc-modal-overlay" onClick={handleOverlayClick}></div>
      <div className="bc-modal-content">{children}</div>
    </div>
  );
};

export default Modal;
