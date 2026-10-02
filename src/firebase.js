// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6-4zehE9lXMcoHH56RYN586pVlEnsyIM",
  authDomain: "my-awesome-project-53042.firebaseapp.com",
  projectId: "my-awesome-project-53042",
  storageBucket: "my-awesome-project-53042.firebasestorage.app",
  messagingSenderId: "374914385950",
  appId: "1:374914385950:web:ab4e0167ade9968bf6460f",
  measurementId: "G-GBNYPD6K5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
