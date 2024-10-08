import React from "react";
import { Modal, Button } from "../../../shared/ui"; // Replace 'your-ui-library' with the actual library you're using

import "../styles/modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rps-modal"
      contentClassName="rps-modal__content"
    >
      <p className="rps-modal__message">{message}</p>
      <Button className="rps-modal__close-button" onClick={onClose}>
        Ok
      </Button>
    </Modal>
  );
};

export default CustomModal;
