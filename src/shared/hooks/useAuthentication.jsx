import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";

const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(null);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
    //
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.name,
      });

      setLoading(false);
      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const loginWithEmailAndPassword = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    //
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      return result.user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }
      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);
  
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider); 
      return result.user;
    } catch (error) {
      let systemErrorMessage;
  
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }
  
      setError(systemErrorMessage);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    loginWithEmailAndPassword,
    loginWithGoogle,
  };
};

export default useAuthentication;
