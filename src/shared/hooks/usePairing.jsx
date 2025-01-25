import { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

const usePairing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePairCode = async (userId, email) => {
    try {
      setLoading(true);
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();

      const pairRef = doc(collection(db, "pairs"), code);
      await setDoc(pairRef, {
        user1: { userId, email },
        user2: null,
        connectedAt: null,
      });

      setLoading(false);
      return code;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw new Error("Erro ao gerar o código.");
    }
  };

  const connectWithCode = async (code, userId, email) => {
    try {
      setLoading(true);
      const pairRef = doc(db, "pairs", code);
      const pairDoc = await getDoc(pairRef);

      if (!pairDoc.exists()) {
        setError("Código inválido.");
        return false;
      }

      const data = pairDoc.data();
      if (data.user2) {
        setError("O código já foi usado.");
        return false;
      }

      await updateDoc(pairRef, {
        user2: { userId, email },
        connectedAt: serverTimestamp(),
      });

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const checkIfUserHasPair = async (userId) => {
    try {
      setLoading(true);

      const pairsRef = collection(db, "pairs");
      const q1 = query(pairsRef, where("user1.userId", "==", userId));
      const result1 = await getDocs(q1);
      const hasPair1 = result1.docs.some((doc) => doc.data().user2 !== null);
      const q2 = query(pairsRef, where("user2.userId", "==", userId));
      const result2 = await getDocs(q2);
      const hasPair = hasPair1 || !result2.empty;
  
      setLoading(false);
      return hasPair;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };  

  const deletePair = async (userId) => {
    try {
      setLoading(true);
      const pairsRef = collection(db, "pairs");
      const q1 = query(pairsRef, where("user1.userId", "==", userId));
      const q2 = query(pairsRef, where("user2.userId", "==", userId));

      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);

      const combinedDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

      if (combinedDocs.length > 0) {
        const pairDoc = combinedDocs[0];
        await deleteDoc(doc(db, "pairs", pairDoc.id));
        setLoading(false);
        return true;
      } else {
        throw new Error("Pair not found");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generatePairCode,
    connectWithCode,
    checkIfUserHasPair,
    deletePair,
  };
};

export default usePairing;
