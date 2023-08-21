
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfxhJDuRscoirddGgUDDMqm9dRodvsIUk",
  authDomain: "threads-395208.firebaseapp.com",
  projectId: "threads-395208",
  storageBucket: "threads-395208.appspot.com",
  messagingSenderId: "847135123657",
  appId: "1:847135123657:web:acbf779b06b562d48ec518"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };