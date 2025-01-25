import React, { useEffect, useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import { useAuthValue } from "../../context/AuthContext";
import usePairing from "../../hooks/usePairing";
import ToastNotification from "../toastNotification/ToastNotification";
import CodeDisplay from "../codeDisplay/CodeDisplay";
import CodeConnectionModal from "../codeConnectionModal/CodeConnectionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ children }) => {
  const [show, setShow] = useState(false);
  const [isPair, setIsPair] = useState(false);
  const [code, setCode] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthValue();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCodeModalOpen = () => setShowModal(true);
  const handleCodeModalClose = () => setShowModal(false);

  const { checkIfUserHasPair, generatePairCode } = usePairing();

  useEffect(() => {
    const result = checkIfUserHasPair(user?.uid);
    if (result) {
      setIsPair(result);
    } else {
      setIsPair(false);
    }
  }, []);

  const handleGeneratePairCode = async (e) => {
    e.preventDefault();
    setError("");

    const code = await generatePairCode(user?.uid, user?.email);
    if (code) {
      setCode(code);
      setToastMessage("Código gerado com sucesso!");
      setShowToast(true);
      setToastType("success");
      setIsPair(true);
    } else {
      setCode("");
      setToastMessage("Erro ao gerar o código.");
      setShowToast(true);
      setToastType("error");
    }
  };

  return (
    <div className="d-flex">
      <div
        className={`${styles.container} d-none d-lg-block bg-dark vh-100 text-white `}
      >
        <h5 className={`${styles.nome} flex-column p-3`}>
          {user?.displayName ? user.displayName : "Usuário logado"}
        </h5>
        {code && <CodeDisplay code={code} />}

        <Nav className={`flex-column`}>
          <div className={styles.menu}>
            {isPair ? (
              <Nav.Link href="#home" className={styles.menuItem}>
                Desconectar Par
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  onClick={handleGeneratePairCode}
                  className={styles.menuItem}
                >
                  Gerar Código
                </Nav.Link>
                <Nav.Link
                  href="#home"
                  className={styles.menuItem}
                  onClick={handleCodeModalOpen}
                >
                  Conectar Par
                </Nav.Link>
              </>
            )}
          </div>
          <Nav.Link href="/" className={styles.menuBottom}>
            Sair
          </Nav.Link>
        </Nav>
      </div>

      <div className="d-lg-none">
        <Button variant="primary" onClick={handleShow} className="m-2">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu Lateral</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link to="/">Sair</Nav.Link>
              <Nav.Link href="#services">Serviços</Nav.Link>
              <Nav.Link href="#contact">Contato</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="flex-grow-1 p-4">{children}</div>
      {showToast && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <CodeConnectionModal
        showModal={showModal}
        handleClose={handleCodeModalClose}
      />
    </div>
  );
};

export default Sidebar;
