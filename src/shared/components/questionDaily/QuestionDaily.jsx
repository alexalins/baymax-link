import React, { useEffect, useState } from "react";
import useQuestions from "../../hooks/useQuestions";
import CardListQuestion from "../cardListQuestion/CardListQuestion";

const QuestionDaily = () => {
  const [myQuestions, setMyQuestions] = useState([]);
  const { fetchTodaysQuestionsToMe } = useQuestions();

  const handleFetchTodaysQuestionsToMe = async () => {
    const questions = await fetchTodaysQuestionsToMe();
    console.log("Perguntas diárias:", questions);
    setMyQuestions(questions);
  };

  const handleEdit = (question) => {
    console.log("Editando a pergunta:", question);
  };

  const handleDelete = (question) => {
    console.log("Excluindo a pergunta:", question);
  };

  const handleComment = (question) => {
    console.log("Comentando a pergunta:", question);
  };

  useEffect(() => {
    console.log("Chamando perguntas diárias...");
    handleFetchTodaysQuestionsToMe();
  }, []);

  return (
    <>
      <CardListQuestion
        type="myQuestions"
        questions={myQuestions}
        isDaily={true}
        isMyQuestion={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onComment={handleComment}
      />
    </>
  );
};

export default QuestionDaily;
