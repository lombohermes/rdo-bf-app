import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2rVGlG0TIkpNsNSyFBSZrU023kj1q_Y0",
  authDomain: "rdo-bf.firebaseapp.com",
  projectId: "rdo-bf",
  storageBucket: "rdo-bf.firebasestorage.app",
  messagingSenderId: "753504843526",
  appId: "1:753504843526:web:1b69fdd77258ad1dedd087",
  measurementId: "G-K6KGDP1YD3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ============================================================
   FONCTIONS POUR LE BLOG
   ============================================================ */

export const getPosts = async () => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPost = async (id) => {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const createPost = async (postData) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...postData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const updatePost = async (id, postData) => {
  await updateDoc(doc(db, 'posts', id), postData);
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

export default app;