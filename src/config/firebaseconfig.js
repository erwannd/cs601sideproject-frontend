import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQ0nKtmin_bH6x2l93Rcq-7BUlKVQlqdA",
  authDomain: "cs601sideprojectauth.firebaseapp.com",
  projectId: "cs601sideprojectauth",
  storageBucket: "cs601sideprojectauth.appspot.com",
  messagingSenderId: "171223211570",
  appId: "1:171223211570:web:051e4ec5ebe9e8c7eb662b",
  measurementId: "G-2X3M2VYSWQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };