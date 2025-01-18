import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/login/Login';
import { onAuthStateChanged } from 'firebase/auth';

//context
import { AuthProvider } from "./shared/context/AuthContext";

//hooks
import useAuthentication from "./shared/hooks/useAuthentication";

//pages
import Home from './pages/home/Home';
import Register from './pages/Register/Register';

function App() {
  const [user, setUser] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
      
      {showToast && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App
