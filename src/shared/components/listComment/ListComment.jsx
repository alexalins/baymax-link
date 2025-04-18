import React from "react";
import { ListGroup } from "react-bootstrap";

const ListComment = ({ myQuestion }) => {
  const formatDate = (date) => {
    const pad = (num) => String(num).padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <ListGroup>
      {myQuestion &&
        myQuestion.comments.length > 0 &&
        myQuestion.comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <div className="text-start">{comment.text}</div>
            <div className="text-end">
              {" "}
              {formatDate(comment.createdAt.toDate())}
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default ListComment;
