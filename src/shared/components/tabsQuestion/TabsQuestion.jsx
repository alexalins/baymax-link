import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import CardListQuestion from "../cardListQuestion/CardListQuestion";
import useQuestions from "../../hooks/useQuestions";
import ModalQuestion from "../modalQuestion/ModalQuestion";

const TabsQuestion = () => {
  const [activeTab, setActiveTab] = useState("forMe");
  const [pairQuestions, setPairQuestions] = useState(null);
  const [myQuestions, setMyQuestions] = useState(null);
  const { fetchQuestionsFromMe, fetchQuestionsToMe } = useQuestions();
  const [showModal, setShowModal] = useState(false);
  const [myQuestionModal, setMyQuestionModal] = useState(null);

  const handleCloseModal = () => {
    handleFetchMyQuestions();
    setShowModal(false)
  };

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  const handleFetchMyQuestions = async () => {
    const questions = await fetchQuestionsFromMe();
    setMyQuestions(questions);
  };

  const handleFetchPairQuestions = async () => {
    const questions = await fetchQuestionsToMe();
    setPairQuestions(questions);
  };

  const handleEdit = (question) => {
    setMyQuestionModal(question);
    setShowModal(true);
  };

  const handleDelete = (question) => {
    console.log("Excluindo a pergunta:", question);
  };

  const handleComment = (question) => {
    console.log("Comentando a pergunta:", question);
  };

  useEffect(() => {
    handleFetchMyQuestions();
  }, []);

  useEffect(() => {
    if (activeTab === "forMe") {
      handleFetchPairQuestions();
    }
    if (activeTab === "myQuestions") {
      handleFetchMyQuestions();
    }
  }, [activeTab]);

  return (
    <>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="forMe">Para mim</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="myQuestions">Minhas perguntas</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-3">
        {activeTab === "forMe" && (
          <CardListQuestion
            type="forMe"
            questions={pairQuestions}
            isMyQuestion={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComment={handleComment}
          />
        )}
        {activeTab === "myQuestions" && (
          <CardListQuestion
            type="myQuestions"
            questions={myQuestions}
            isMyQuestion={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComment={handleComment}
          />
        )}
      </div>
      <ModalQuestion show={showModal} onClose={handleCloseModal} myQuestion={myQuestionModal}/>
    </>
  );
};

export default TabsQuestion;
