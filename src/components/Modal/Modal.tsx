import React from "react";
import { ModalContainer, ModalContent } from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      {/* <ModalContent> */}
      {children}
      {/* <button onClick={onClose}>Close</button> */}
      {/* </ModalContent> */}
    </ModalContainer>
  );
};

export default Modal;
