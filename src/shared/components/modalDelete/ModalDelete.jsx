import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useQuestions from "../../hooks/useQuestions";

const ModalDelete = ({ show, onClose, myQuestion }) => {
  const { deleteQuestion } = useQuestions();

  const handleDeleteQuestion = async (e) => {
    e.preventDefault();
    await deleteQuestion(myQuestion.id);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deseja excluir essa pergunta?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você tem certeza que deseja excluir essa pergunta?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="danger" onClick={handleDeleteQuestion}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
