// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt5nyPsqxPUdIuHOFVJixwB5RG5q-idOg",
  authDomain: "my-demo-5667d.firebaseapp.com",
  projectId: "my-demo-5667d",
  storageBucket: "my-demo-5667d.appspot.com",
  messagingSenderId: "802442928131",
  appId: "1:802442928131:web:996167f16845f984246e36",
  measurementId: "G-P1K66P6YJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);