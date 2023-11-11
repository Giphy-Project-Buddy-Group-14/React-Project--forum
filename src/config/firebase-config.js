import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBel8sDIqzDvtCi4jBVYJC86kXvzpme8OM",
  authDomain: "react-project--forum.firebaseapp.com",
  databaseURL: "https://react-project--forum-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-project--forum",
  storageBucket: "react-project--forum.appspot.com",
  messagingSenderId: "586380113779",
  appId: "1:586380113779:web:51613b3740ddc08acdf706"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage();
