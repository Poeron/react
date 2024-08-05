import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalBillProps {
  show: boolean;
  handleClose: () => void;
  billId: number | null;
  payBill: () => void;
}

const ModalBill: React.FC<ModalBillProps> = ({
  show,
  handleClose,
  billId,
  payBill,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fatura Öde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Fatura ID: {billId?.toString()}</p>
        <p>Bu faturayı ödemek istediğinizden emin misiniz?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={payBill}>
          Ödemeyi Onayla
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBill;
