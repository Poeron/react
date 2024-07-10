// ConfirmationModal.tsx
import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  body: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  title,
  body,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hayır
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Evet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
