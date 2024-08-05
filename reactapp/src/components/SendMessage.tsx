import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { post } from "./ApiHelper";

const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const postMessage = async () => {
    try {
      const url = `/api/User/SendMessage`;
      await post(url, {
        content: message,
        date_and_time: new Date().toISOString(),
      });
      alert("Mesajınız gönderildi.");
      setMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Text>Mesajınız:</InputGroup.Text>
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </InputGroup>
      <Button variant="primary" onClick={postMessage}>
        Mesajı Gönder
      </Button>
    </Form>
  );
};

export default SendMessage;
