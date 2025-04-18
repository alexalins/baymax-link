import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./CardComment.module.css";
import useQuestions from "../../hooks/useQuestions";

const CardComment = ({ myQuestion, onClose }) => {
  const [comment, setComment] = useState('');
  const { answerQuestion } = useQuestions();

  const handleAddComment = async (e) => {
    e.preventDefault();
    await answerQuestion(myQuestion.id, comment);
    onClose();
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="controlTextarea">
          <Form.Label>Comentário</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </Form.Group>
      </Form>
      <div className={styles.divButtons}>
        <Button
          variant="secondary"
          onClick={onClose}
          className={styles.buttonLeft}
        >
          Fechar
        </Button>
        <Button variant="danger" onClick={handleAddComment}>Salvar</Button>
      </div>
    </div>
  );
};

export default CardComment;
