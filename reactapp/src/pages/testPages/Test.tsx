import React from "react";
import { Button, Dropdown, Form } from "react-bootstrap";

const test = () => {
  return (
    <Form>
      <Form.Group controlId="formSelect">
        <Form.Label>Kiracı</Form.Label>
        <Form.Control as="select">
          <option value="action-1">Kiracı 1</option>
          <option value="action-2">Başka Kiracı</option>
          <option value="action-3">Çok Başka Kiracı</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formFile">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" name="file" accept=".jpg,.jpeg,.png,.webp" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default test;
