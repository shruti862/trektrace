import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDJ4vMcAbHOsVo2gM_dQ6A3jjopQlXW_60",
  authDomain: "worldwise-5b652.firebaseapp.com",
  projectId: "worldwise-5b652",
  storageBucket: "worldwise-5b652.appspot.com",
  messagingSenderId: "947799075352",
  appId: "1:947799075352:web:3efb38b176b9d321db716d",
  measurementId: "G-JK8N92CK33",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export { storage, auth, provider, db };
