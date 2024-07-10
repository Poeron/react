// UserModal.tsx
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface UserModalProps {
  show: boolean;
  handleClose: () => void;
  selectedUser: {
    id: number;
    full_name: string;
    national_id: string;
    email: string;
    phone: string;
  } | null;
  updateUser: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  show,
  handleClose,
  selectedUser,
  updateUser,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedUser ? "Kullanıcı ID: " + selectedUser.id : "ID alınamadı."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bd-example">
          <Form>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="text"
                id="full_name"
                autoComplete="full_name"
                placeholder="John Doe"
                defaultValue={selectedUser?.full_name}
              />
              <Form.Label htmlFor="full_name">Ad Soyad</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="text"
                id="national_id"
                autoComplete="national_id"
                placeholder="TCKN"
                defaultValue={selectedUser?.national_id}
              />
              <Form.Label htmlFor="national_id">TCKN</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="email"
                id="email"
                autoComplete="email"
                placeholder="name@example.com"
                defaultValue={selectedUser?.email}
              />
              <Form.Label htmlFor="email">E-Mail</Form.Label>
            </Form.Floating>
            <Form.Floating className=" mb-3">
              <Form.Control
                type="tel"
                id="phone"
                autoComplete="phone"
                placeholder="5554442211"
                defaultValue={selectedUser?.phone}
              />
              <Form.Label htmlFor="phone">Telefon Numarası</Form.Label>
            </Form.Floating>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={updateUser}>
          Düzenle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
