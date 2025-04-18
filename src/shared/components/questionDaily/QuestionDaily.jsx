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

  useEffect(() => {
    console.log("Chamando perguntas diárias...");
    handleFetchTodaysQuestionsToMe();
  }, []);

  return (
    <>
      <CardListQuestion type="myQuestions" questions={myQuestions} isDaily={true} />
    </>
  );
};

export default QuestionDaily;
