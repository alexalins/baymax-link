import { useEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { Card, Button, Form, FloatingLabel } from 'react-bootstrap';
import styles from "./Register.module.css";
import { useNavigate } from 'react-router-dom';

import { db } from "../../../firebase/config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, error: authError, loading } = useAuthentication();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      console.log(error);
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    const res = await createUser(user);
    if(res) {
      console.log(res);
      navigate('/');
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={`${styles.register} d-flex justify-content-center align-items-center`}>
      <Card className={styles.card}>
        <Card.Body>
          <h3 className="text-center">Cadastre-se</h3>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="name" label="Nome" className="mb-3">
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="Nome do usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="email" label="E-mail" className="mb-3">
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="E-mail do usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="password" label="Senha" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="confirmPassword" label="Confirmação de senha" className="mb-3">
              <Form.Control
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirme a sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FloatingLabel>

            {loading ? (
              <Button className="btn btn-danger w-100" disabled> Aguardando... </Button>
            ) : (
              <Button className="btn btn-danger w-100" type="submit">Salvar</Button>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;