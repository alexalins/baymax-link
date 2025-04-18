import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { onAuthStateChanged } from "firebase/auth";

//context
import { AuthProvider } from "./shared/context/AuthContext";
import { PartnerProvider } from "./shared/context/PartnerContext";

//hooks
import useAuthentication from "./shared/hooks/useAuthentication";
import usePairing from "./shared/hooks/usePairing";

//pages
import Home from "./pages/home/Home";
import Register from "./pages/Register/Register";

function App() {
  const [user, setUser] = useState(undefined);
  const [pairId, setPairId] = useState(undefined);

  const { auth } = useAuthentication();
  const { getPairId } = usePairing();

  const handleFetPairId = async () => {
    if (user) {
      const pairIdFromServer = await getPairId(user.uid); 
      setPairId(pairIdFromServer);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribeAuth(); 
  }, [auth]);

  useEffect(() => {
    handleFetPairId();
  }, [user, getPairId]);

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <PartnerProvider value={{ pairId }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </BrowserRouter>
        </PartnerProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
