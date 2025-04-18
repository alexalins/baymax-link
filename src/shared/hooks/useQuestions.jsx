import { useState } from "react";
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
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthValue } from "../context/AuthContext";
import { usePartner } from "../context/PartnerContext";


const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuthValue();
  const { pairId } = usePartner()

  // Perguntas que eu fiz para meu par
  const fetchQuestionsFromMe = async () => {
    const q = query(
      collection(db, "questions"),
      where("authorId", "==", user.uid),
      where("recipientId", "==", pairId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  };

  // Perguntas que meu par fez para mim
  const fetchQuestionsToMe = async () => {
    const q = query(
      collection(db, "questions"),
      where("authorId", "==", pairId),
      where("recipientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return list;
  };

  // Perguntas que meu par fez para mim de hoje
  const fetchTodaysQuestionsToMe = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
  
    const q = query(
      collection(db, "questions"),
      where("authorId", "==", pairId),
      where("recipientId", "==", user.uid),
      where("createdAt", ">=", startOfToday),
      orderBy("createdAt", "desc")
    );
  
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return list;
  };  

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

    await addDoc(collection(db, "questions"), {
      text,
      createdAt: serverTimestamp(),
      authorId: user.uid,
      recipientId: pairId,
      participants: [user.uid, pairId],
      comments: [],
    });

    fetchQuestions();
  };

  const getQuestionById = async (id) => {
    const ref = doc(db, "questions", id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  };

  const editQuestion = async (id, newText) => {
    const ref = doc(db, "questions", id);
    await updateDoc(ref, { text: newText });
    fetchQuestions();
  };

  const deleteQuestion = async (id) => {
    const ref = doc(db, "questions", id);
    await deleteDoc(ref);
    fetchQuestions();
  };

  const answerQuestion = async (id, answer) => {
    if (!id || !answer || !user?.uid) return;
  
    try {
      const ref = doc(db, "questions", id);
  
      const comment = {
        text: answer,
        createdAt: new Date(),
        authorId: user.uid,
      };
  
      await updateDoc(ref, {
        answeredAt: serverTimestamp(),
        comments: arrayUnion(comment),
      });
  
      fetchQuestions();
    } catch (error) {
      console.error("Erro ao responder pergunta:", error);
    }
  };
   
  return {
    questions,
    createQuestion,
    getQuestionById,
    editQuestion,
    deleteQuestion,
    answerQuestion,
    fetchQuestionsFromMe,
    fetchQuestionsToMe,
    fetchTodaysQuestionsToMe
  };
};

export default useQuestions;
