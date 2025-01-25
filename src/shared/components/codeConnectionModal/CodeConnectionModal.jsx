import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import usePairing from "../../hooks/usePairing";
import { useAuthValue } from "../../context/AuthContext";

const CodeConnectionModal = ({ showModal, handleClose }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { user } = useAuthValue();
  const { connectWithCode, error } = usePairing();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await connectWithCode(code, user?.uid, user?.email);
    if (result) {
      setMessage("Código conectado com sucesso!");
      setMessageType("success");
      handleClose();
    } else {
      setMessage(error);
      setMessageType("error");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Conectar com o Código</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="codeInput">
            <Form.Label>Digite o código de conexão:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="text-end">
        <Button variant="primary" onClick={handleSubmit}>
          Conectar
        </Button>
      </Modal.Footer>
      {message && (
        <span
          className="text-center"
          style={
            messageType === "success"
              ? { color: "green", paddingBottom: "10px" }
              : { color: "red", paddingBottom: "10px" }
          }
        >
          {message}
        </span>
      )}
    </Modal>
  );
};

export default CodeConnectionModal;
