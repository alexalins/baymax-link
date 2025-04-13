import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CardListQuestion = ({ questions }) => {
  console.log(questions);
  return (
    <Card style={{ width: "50rem" }}>
    <ListGroup variant="flush">
      {questions && questions.length > 0 ? (
        questions.map((question, index) => (
          <ListGroup.Item key={index}>{question?.text}</ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Sem perguntas disponíveis!</ListGroup.Item>
      )}
    </ListGroup>
  </Card>
  );
};

export default CardListQuestion;
