import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./CardListQuestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const CardListQuestion = ({
  questions,
  isDaily = false,
  isMyQuestion,
  onEdit,
  onDelete,
  onComment,
}) => {
  return (
    <Card style={{ width: "50rem" }}>
      <ListGroup variant="flush">
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <ListGroup.Item key={index} className={styles.cardQuestion}>
              <div>{question?.text}</div>
              {isMyQuestion ? (
                <div >
                  <button onClick={() => onEdit(question)} className={styles.button}>
                    <FontAwesomeIcon icon={faEdit} color="blue"/>
                  </button>
                  <button onClick={() => onDelete(question)} className={styles.button}>
                    <FontAwesomeIcon icon={faTrashAlt} color="red"/>
                  </button>
                </div>
              ) : (
                <div className={styles.divButtons}>
                  <button onClick={() => onComment(question)} className={styles.button}>
                    <FontAwesomeIcon icon={faCommentDots} color="black"/>
                  </button>
                </div>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <>
            {isDaily ? (
              <ListGroup.Item>Você não tem perguntas diárias.</ListGroup.Item>
            ) : (
              <ListGroup.Item>Você não tem perguntas.</ListGroup.Item>
            )}
          </>
        )}
      </ListGroup>
    </Card>
  );
};

export default CardListQuestion;
