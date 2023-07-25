import { useState, useEffect, createContext } from "react";

import { auth, db } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const localStorageKey = 'dadosUser';

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customersExist, setCustomersExist] = useState([]);

  const navigate = useNavigate();

  // buscando se tem usuário logado e salvo no localStorage
  useEffect(() => {
    async function loadUser() {
      const storageUser = JSON.parse(localStorage.getItem(localStorageKey));

      if (storageUser) {
        setUser(storageUser)
        setLoading(false);
      }
      setLoading(false);
    }
    loadUser();

  }, []);

  useEffect(() => {
    async function handleSearchCustomers() {
      const docRef = collection(db, 'customers');
      const q = query(docRef)

      const customers = onSnapshot(q, (snapshot) => {
        let list = [];
        snapshot.forEach((doc => {
          list.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia,
            cnpj: doc.data().cnpj
          })
        }))
        setCustomersExist(list);
      })
    }

    handleSearchCustomers();

  }, [])


  // logando usuário e salvando no localStorage

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {

        let uid = value.user.uid;

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl
        }
        setUser(data);
        storageUser(data)
        setLoadingAuth(false);
        navigate('/dashboard');
      })
      .catch((error) => {

        if (error.code === 'auth/user-not-found') {
          alert('Não encontramos o seu cadastro em nosso banco de dados cadastre-se gratuitamente');
          setLoadingAuth(false);
          return;
        }
        if (error.code === 'auth/wrong-password') {
          alert('Senha incorreta');
          setLoadingAuth(false);
          return;
        }
        setLoadingAuth(false)
        console.log(error);
      })
  }

  // cadastrando usuário e criando um doc para armazenar dados do usuário 

  async function signUp(name, email, password) {
    setLoadingAuth(true);
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
            setLoadingAuth(false);
            navigate('/dashboard');
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Este email já está em nosso banco de dados');

          setLoadingAuth(false);
          return;
        }
        console.log(error);
        setLoadingAuth(false);
      })
  }

  // salvando dados do usuário no localStorage
  function storageUser(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  // deslogando usuário e removendo os dados do localStorage
  async function logout() {
    await signOut(auth);
    localStorage.removeItem(localStorageKey);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        signIn,
        signUp,
        logout,
        storageUser,
        loadingAuth,
        loading,
        customersExist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
