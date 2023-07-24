import { useState, useEffect, createContext } from "react";

import { auth, db } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function signIn(email, password) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {

        let uid = value.user.uid;

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().name,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl
        }
        setUser(data);
        storageUser(data)
        setLoading(false);
        navigate('/dashboard')
      })
      .catch((error) => {

        if (error.code === 'auth/user-not-found') {
          alert('Não encontramos o seu cadastro em nosso banco de dados cadastre-se gratuitamente');
          setLoading(false);
          return;
        }
        if (error.code === 'auth/wrong-password') {
          alert('Senha incorreta')
          setLoading(false);
          return;
        }
        console.log(error)
      })
  }

  async function signUp(name, email, password) {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {

        let uid = value.user.uid;

        await setDoc(doc(db, 'users', uid), {
          nome: name,
          avatarUrl: null
        })
          .then(() => {
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null
            }
            setUser(data);
            storageUser(data);
            setLoading(false);
            navigate('/dashboard')
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Este email já está em nosso banco de dados')
        }
        console.log(error);
        setLoading(false);
      })
  }

  function storageUser(data) {
    localStorage.setItem('@dadosUser', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //converte null para booleano
        user,
        signIn,
        signUp,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
