import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1UGPdd-IJmyTaJFOGQkmUrE3IpGRRwS8",
  authDomain: "technicall-challenge-03.firebaseapp.com",
  projectId: "technicall-challenge-03",
  storageBucket: "technicall-challenge-03.appspot.com",
  messagingSenderId: "968946708523",
  appId: "1:968946708523:web:001c8adc9bd27862523a6e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);