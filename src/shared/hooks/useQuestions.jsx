import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from "../../../firebase/config";
import { useAuthValue } from "../context/AuthContext";
import usePairing from "./usePairing";

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [pairId, setPairId] = useState(null);
  const { user } = useAuthValue();
  const { getPairId } = usePairing();

  // Carrega o pairId assim que tiver user logado
  useEffect(() => {
    const fetchPair = async () => {
      if (user) {
        const id = await getPairId(user.uid);
        setPairId(id);
      }
    };
    fetchPair();
  }, [user]);

  // Busca perguntas quando tiver user e pairId definidos
  useEffect(() => {
    if (user && pairId) {
      fetchQuestions();
    }
  }, [user, pairId]);

  // Lista perguntas entre você e seu par
  const fetchQuestions = async () => {
    const q = query(
      collection(db, 'questions'),
      where('participants', 'array-contains', user.uid),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setQuestions(list);
  };

  // Cria nova pergunta pro par
  const createQuestion = async (text) => {
    if (!pairId) return;

    await addDoc(collection(db, 'questions'), {
      text,
      createdAt: serverTimestamp(),
      authorId: user.uid,
      recipientId: pairId,
      participants: [user.uid, pairId]
    });

    fetchQuestions();
  };

  const getQuestionById = async (id) => {
    const ref = doc(db, 'questions', id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  };

  const editQuestion = async (id, newText) => {
    const ref = doc(db, 'questions', id);
    await updateDoc(ref, { text: newText });
    fetchQuestions();
  };

  const deleteQuestion = async (id) => {
    const ref = doc(db, 'questions', id);
    await deleteDoc(ref);
    fetchQuestions();
  };

  const answerQuestion = async (id, answer) => {
    const ref = doc(db, 'questions', id);
    await updateDoc(ref, {
      answer,
      answeredAt: serverTimestamp()
    });
    fetchQuestions();
  };

  return {
    questions,
    createQuestion,
    getQuestionById,
    editQuestion,
    deleteQuestion,
    answerQuestion
  };
};

export default useQuestions;