import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtVgpVJCVv0qOm8jticFYHrcZKvcK41to",
  authDomain: "samadhan-8e4fd.firebaseapp.com",
  projectId: "samadhan-8e4fd",
  storageBucket: "samadhan-8e4fd.firebasestorage.app",
  messagingSenderId: "750324158063",
  appId: "1:750324158063:web:9096ac17f04b0c512d479a",
  measurementId: "G-S70Z7EK0ZV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;