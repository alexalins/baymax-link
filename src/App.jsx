import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { onAuthStateChanged } from "firebase/auth";

//context
import { AuthProvider } from "./shared/context/AuthContext";

//hooks
import useAuthentication from "./shared/hooks/useAuthentication";

//pages
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
