import React, { useEffect, useState } from "react";
import useQuestions from "../../hooks/useQuestions";
import CardListQuestion from "../cardListQuestion/CardListQuestion";

const QuestionDaily = () => {
  const [myQuestions, setMyQuestions] = useState([]);
  const { fetchTodaysQuestionsToMe } = useQuestions();

  const handleFetchTodaysQuestionsToMe = async () => {
    const questions = await fetchTodaysQuestionsToMe();
    setMyQuestions(questions);
  };
  
  const handleComment = (question) => {
    console.log("Comentando a pergunta:", question);
  };

  useEffect(() => {
    handleFetchTodaysQuestionsToMe();
  }, []);

  return (
    <>
      <CardListQuestion
        type="myQuestions"
        questions={myQuestions}
        isDaily={true}
        isMyQuestion={false}
        onComment={handleComment}
      />
    </>
  );
};

export default QuestionDaily;
