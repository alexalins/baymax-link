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
  const [isPair, setIsPair] = useState(null);
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
      const pair1 = result1.docs.find((doc) => doc.data().user2 === null || doc.data().user2 !== null);
      const isPair1Null = pair1 ? pair1.data().user2 === null : false; 
    
      const q2 = query(pairsRef, where("user2.userId", "==", userId));
      const result2 = await getDocs(q2);
      const pair2 = result2.docs.find((doc) => doc.data().user1 === null || doc.data().user1 !== null);
      const isPair2Null = pair2 ? pair2.data().user1 === null : false; 
      const hasPair = pair1 || pair2;
    
      setLoading(false);
    
      return {
        hasPair: hasPair ? true : false,
        isPairNull: isPair1Null || isPair2Null 
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { hasPair: false, isPairNull: false };
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

  const getPairId = async (userId) => {
    try {
      setLoading(true);

      const pairsRef = collection(db, "pairs");

      // Verifica se o usuário é user1
      const q1 = query(pairsRef, where("user1.userId", "==", userId));
      const result1 = await getDocs(q1);
      if (!result1.empty) {
        const pairData = result1.docs[0].data();
        if (pairData.user2) {
          setLoading(false);
          return pairData.user2.userId;
        }
      }

      // Verifica se o usuário é user2
      const q2 = query(pairsRef, where("user2.userId", "==", userId));
      const result2 = await getDocs(q2);
      if (!result2.empty) {
        const pairData = result2.docs[0].data();
        if (pairData.user1) {
          setLoading(false);
          return pairData.user1.userId;
        }
      }

      setLoading(false);
      return null; // Não tem par ainda
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    generatePairCode,
    connectWithCode,
    checkIfUserHasPair,
    deletePair,
    getPairId,
  };
};

export default usePairing;
