import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CardListQuestion = ({ questions, isDaily = false }) => {
  return (
    <Card style={{ width: "50rem" }}>
      <ListGroup variant="flush">
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <ListGroup.Item key={index}>{question?.text}</ListGroup.Item>
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
