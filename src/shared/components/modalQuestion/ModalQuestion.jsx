import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useQuestions from "../../hooks/useQuestions";

const ModalQuestion = ({ show, onClose, myQuestion = null }) => {
  const textQuestionInit = "Em uma escala de 1 a 10...";
  const [question, setQuestion] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { createQuestion, editQuestion} = useQuestions();

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if(isEdit) {
      await editQuestion(myQuestion.id, question);
    } else {
      await createQuestion(question);
    }
    setQuestion(textQuestionInit);
    onClose();
  };

  useEffect(() => {
    if (myQuestion) {
      setQuestion(myQuestion.text);
      setIsEdit(true)
    } else {
      setQuestion(textQuestionInit);
      setIsEdit(false)
    }
  }, [myQuestion]);

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
