import React, { useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import { useAuthValue } from "../../context/AuthContext";


const Sidebar = ({ children }) => {
  const [show, setShow] = useState(false);
  const { user } = useAuthValue();  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(user)

  return (
    <div className="d-flex">
      <div
        className={`${styles.container} d-none d-lg-block bg-dark vh-100 text-white `}
      >
        <h5 className={`${styles.nome} flex-column p-3`}>{user.displayName ? user.displayName : 'Usuário logado'}</h5>
        <Nav className={`flex-column`}>
          <div className={styles.menu}>
            <Nav.Link href="#home" className={styles.menuItem}>Gerar Código</Nav.Link>
            <Nav.Link href="#home" className={styles.menuItem}>Desconectar Par</Nav.Link>
          </div>
          <Nav.Link href="/" className={styles.menuBottom}>Sair</Nav.Link>
        </Nav>
      </div>

      <div className="d-lg-none">
        <Button variant="primary" onClick={handleShow} className="m-2">
          ☰
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
    </div>
  );
};

export default Sidebar;
