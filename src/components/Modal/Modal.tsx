import React from "react";
import { ModalContainer } from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return <ModalContainer>{children}</ModalContainer>;
};

export default Modal;
