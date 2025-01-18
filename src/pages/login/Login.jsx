import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import useAuthentication from "../../hooks/useAuthentication";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    loginWithEmailAndPassword,
    error: authError,
    loading,
    loginWithGoogle,
    user,
  } = useAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const userLogin = {
      email,
      password,
    };
    await loginWithEmailAndPassword(userLogin);
    console.log(user);
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();

    setError("");
    await loginWithGoogle(user);
    console.log(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div
      className={`${styles.login} d-flex justify-content-center align-items-center`}
    >
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
        </Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingEmail" label="E-mail">
              <Form.Control
                type="email"
                placeholder="Insira o e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex flex-column align-items-center">
            <Button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-100 mb-3"
            >
              Entrar
            </Button>
            <Button
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={loading}
              className="btn btn-danger mb-3 w-100"
            >
              Entrar com Google
            </Button>
            <Button variant="link" className="btn w-100">
              Cadastrar
            </Button>
          </div>
          {loading && <p className="error">Aguarde...</p>}
          {error && <p className="error">{error}</p>}
        </Form>
      </Card>
    </div>
  );
};

export default Login;
