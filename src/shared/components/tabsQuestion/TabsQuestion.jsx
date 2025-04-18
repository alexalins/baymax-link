import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import CardListQuestion from "../cardListQuestion/CardListQuestion";
import useQuestions from "../../hooks/useQuestions";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import ModalDelete from "../modalDelete/ModalDelete";

const TabsQuestion = () => {
  const [activeTab, setActiveTab] = useState("forMe");
  const [pairQuestions, setPairQuestions] = useState(null);
  const [myQuestions, setMyQuestions] = useState(null);
  const { fetchQuestionsFromMe, fetchQuestionsToMe } = useQuestions();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [myQuestionModal, setMyQuestionModal] = useState(null);

  const handleCloseModalEdit = () => {
    handleFetchMyQuestions();
    setShowModalEdit(false)
  };

  const handleCloseModalDelete = () => {
    handleFetchMyQuestions();
    setShowModalDelete(false);
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
    setShowModalEdit(true);
  };

  const handleDelete = (question) => {
    setMyQuestionModal(question);
    setShowModalDelete(true);
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
          />
        )}
        {activeTab === "myQuestions" && (
          <CardListQuestion
            type="myQuestions"
            questions={myQuestions}
            isMyQuestion={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <ModalQuestion show={showModalEdit} onClose={handleCloseModalEdit} myQuestion={myQuestionModal}/>
      <ModalDelete show={showModalDelete} onClose={handleCloseModalDelete} myQuestion={myQuestionModal}/>
    </>
  );
};

export default TabsQuestion;
