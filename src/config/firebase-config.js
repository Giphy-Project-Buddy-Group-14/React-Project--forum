// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// getAuth().projectConfigManager().updateProjectConfig(
//   {
//     emailPrivacyConfig: {
//       enableImprovedEmailPrivacy: false,
//     },
//   }
// );

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBel8sDIqzDvtCi4jBVYJC86kXvzpme8OM",
  authDomain: "react-project--forum.firebaseapp.com",
  projectId: "react-project--forum",
  storageBucket: "react-project--forum.appspot.com",
  messagingSenderId: "586380113779",
  appId: "1:586380113779:web:51613b3740ddc08acdf706",
  databaseURL: "https://react-project--forum-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);