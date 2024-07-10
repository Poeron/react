// ModalComponent.tsx
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Apartment } from "./ApartmentList"; // Eğer ApartmentList'te Apartment interface varsa

interface ModalComponentProps {
  show: boolean;
  handleClose: () => void;
  selectedApartment: Apartment | null;
  updateApartment: () => void;
}

const ApartmentModal: React.FC<ModalComponentProps> = ({
  show,
  handleClose,
  selectedApartment,
  updateApartment,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedApartment
            ? "Daire ID: " + selectedApartment.id
            : "ID alınamadı."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bd-example">
          <Form>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="text"
                id="type"
                autoComplete="type"
                placeholder="2+1"
                defaultValue={selectedApartment?.type}
              />
              <Form.Label htmlFor="type">Tipi</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="text"
                id="block"
                autoComplete="block"
                placeholder="A"
                defaultValue={selectedApartment?.block}
              />
              <Form.Label htmlFor="block">Blok</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="number"
                id="apartment_number"
                autoComplete="apartment_number"
                placeholder="12"
                defaultValue={selectedApartment?.apartment_number}
              />
              <Form.Label htmlFor="apartment_number">Daire Numarası</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="number"
                id="floor"
                autoComplete="floor"
                placeholder="2"
                defaultValue={selectedApartment?.floor}
              />
              <Form.Label htmlFor="floor">Bulunduğu Kat</Form.Label>
            </Form.Floating>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={updateApartment}>
          Düzenle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApartmentModal;
