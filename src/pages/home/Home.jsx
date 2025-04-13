import React, { useState, useEffect } from "react";
import ToastNotification from "../../shared/components/toastNotification/ToastNotification";
import Sidebar from "../../shared/components/sidebar/Sidebar";
import FloatingButton from "../../shared/components/floatingButton/floatingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalQuestion from "../../shared/components/modalQuestion/ModalQuestion";

const Home = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPair, setIsPair] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePairStatusChange = (status) => {
    setIsPair(status);
  };

  useEffect(() => {
    setToastMessage("Login realizado com sucesso!");
    setShowToast(true);
    setToastType("success");
  }, []);

  return (
    <div>
      <Sidebar onPairStatusChange={handlePairStatusChange}>
        <h1>Home</h1>

        {showToast && (
          <ToastNotification
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </Sidebar>
      {isPair && (
        <FloatingButton
          onClick={() => handleOpenModal()}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      )}
      <ModalQuestion show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
