

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQN6NXSM2gVwFPR3ICoLkaZN1iiI-w5Po",
  authDomain: "auroshop.firebaseapp.com",
  projectId: "auroshop",
  storageBucket: "auroshop.firebasestorage.app",
  messagingSenderId: "755837402104",
  appId: "1:755837402104:web:cf96f882dff7f826f8340d",
  measurementId: "G-E1HP5B0PN2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
