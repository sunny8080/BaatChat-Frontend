import './Modal.scss';
import type { ReactNode } from 'react';

type Props = {
  handleOverlayClick: () => void;
  children: ReactNode;
  modalContentStyles?: React.CSSProperties;
};

const Modal = ({ handleOverlayClick, modalContentStyles = {}, children }: Props) => {
  return (
    <div className="bc-Modal">
      <div className="bc-modal-overlay" onClick={handleOverlayClick}></div>
      <div className="bc-modal-content" style={modalContentStyles}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
