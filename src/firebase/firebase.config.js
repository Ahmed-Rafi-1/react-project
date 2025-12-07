import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// YOUR FIREBASE CONFIG - Fixed authDomain
const firebaseConfig = {
  apiKey: "AIzaSyC_UeIgIo4X-T_rOk2d5q2oV96-EaZE06o",
  authDomain: "react-project-d5dae.firebaseapp.com", // Fixed from firebasestorage.app
  projectId: "react-project-d5dae",
  storageBucket: "react-project-d5dae.firebasestorage.app",
  messagingSenderId: "371262376172",
  appId: "1:371262376172:web:3a9648b59d94544d7efdc9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
