import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAmkkvA8MIAPJyf_EBq32cJEu7YBMkgXxc",
  authDomain: "chamados-c6660.firebaseapp.com",
  projectId: "chamados-c6660",
  storageBucket: "chamados-c6660.appspot.com",
  messagingSenderId: "532469441967",
  appId: "1:532469441967:web:970cb116a94b350c76bb5a",
  measurementId: "G-CNRK3SH2RN"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
