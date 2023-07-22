import { useState, useEffect, createContext } from "react";

import { auth, db } from '../services/firebaseConection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function signIn(email, password) {
    console.log(email);
    console.log(password);
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
