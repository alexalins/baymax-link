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
import { db } from '../firebase';
import { useAuth } from './useAuth';

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const { user, pairId } = useAuth();

  useEffect(() => {
    if (user && pairId) fetchQuestions();
  }, [user, pairId]);

  // Lista perguntas entre você e seu par (autor ou destinatário)
  async function fetchQuestions() {
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
  }

  // Cria uma nova pergunta destinada ao seu par
  async function createQuestion(text) {
    await addDoc(collection(db, 'questions'), {
      text,
      createdAt: serverTimestamp(),
      authorId: user.uid,
      recipientId: pairId,
      participants: [user.uid, pairId]
    });
    fetchQuestions();
  }

  // Busca pergunta por ID
  async function getQuestionById(id) {
    const ref = doc(db, 'questions', id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  // Edita o texto da pergunta
  async function editQuestion(id, newText) {
    const ref = doc(db, 'questions', id);
    await updateDoc(ref, { text: newText });
    fetchQuestions();
  }

  // Exclui pergunta
  async function deleteQuestion(id) {
    const ref = doc(db, 'questions', id);
    await deleteDoc(ref);
    fetchQuestions();
  }

  // Responde a pergunta
  async function answerQuestion(id, answer) {
    const ref = doc(db, 'questions', id);
    await updateDoc(ref, {
      answer,
      answeredAt: serverTimestamp()
    });
    fetchQuestions();
  }

  return {
    questions,
    createQuestion,
    getQuestionById,
    editQuestion,
    deleteQuestion,
    answerQuestion
  };
}
