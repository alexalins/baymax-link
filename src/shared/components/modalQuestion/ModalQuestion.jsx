import React, { useState } from "react";
import styles from "./modalQuestion.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useQuestions from "../../hooks/useQuestions";

const ModalQuestion = ({ show, onClose }) => {
  const textQuestionInit = "Em uma escala de 1 a 10...";
  const [question, setQuestion] = useState(textQuestionInit);
  const { createQuestion } = useQuestions();

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    await createQuestion(question);
    setQuestion(textQuestionInit);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar pergunta ao Baymax</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="questionForm.ControlTextarea1"
          >
            <Form.Label>Digite sua pergunta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleAddQuestion}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQuestion;
