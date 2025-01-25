import React, { useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex">
      <div
        className="d-none d-lg-block bg-light vh-100 p-3"
        style={{ width: "250px" }}
      >
        <h5 className="text-primary">Menu Lateral</h5>
        <Nav className="flex-column">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link to="/">Sair</Nav.Link>
          <Nav.Link href="#services">Serviços</Nav.Link>
          <Nav.Link href="#contact">Contato</Nav.Link>
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
