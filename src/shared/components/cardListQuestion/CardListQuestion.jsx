import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./CardListQuestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import CardComment from "../cardComment/cardComment";
import ListComment from "../listComment/ListComment";

const CardListQuestion = ({
  questions,
  isDaily = false,
  isMyQuestion,
  onEdit,
  onDelete
}) => {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [activeListComment, setActiveListComment] = useState(null);
  const [isShowComment, setIsShowComment] = useState(false);

  const handleComment = (questionId) => {
    setActiveCommentId(questionId);
  };

  const handleListComment = (questionId) => {
    setActiveListComment(questionId);
    setIsShowComment(!isShowComment);
  };

  return (
    <Card style={{ width: "50rem" }}>
      <ListGroup variant="flush">
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col xs={8} className="text-start">{question?.text}</Col>
                <Col xs={4}>
                  {isMyQuestion ? (
                    <div>
                      <button
                        onClick={() => onEdit(question)}
                        className={styles.button}
                      >
                        <FontAwesomeIcon icon={faEdit} color="blue" />
                      </button>
                      <button
                        onClick={() => onDelete(question)}
                        className={styles.button}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} color="red" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.divButtons}>
                        <button
                          onClick={() => handleComment(question.id)}
                          className={styles.button}
                        >
                          <FontAwesomeIcon icon={faCommentDots} color="black" />
                        </button>
                        <Badge bg="primary" pill onClick={() => handleListComment(question.id)}>
                          {question?.comments?.length}
                        </Badge>
                      </div>
                    </>
                  )}
                </Col>
                <Col xs={12}>
                  {activeCommentId === question.id && (
                    <CardComment myQuestion={question} onClose={() => setActiveCommentId(null)}/>
                  )}
                </Col>
                <Col xs={12}>
                  {isShowComment && activeListComment === question.id && (
                    <ListComment myQuestion={question}/>
                  )}
                </Col>
              </Row>
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
