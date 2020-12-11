import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjrAFfSyCQG_0PWtRui42nAd51ckjmKSQ",
  authDomain: "rn-income-track-app.firebaseapp.com",
  projectId: "rn-income-track-app",
  storageBucket: "rn-income-track-app.appspot.com",
  messagingSenderId: "209632596604",
  appId: "1:209632596604:web:e56e4ee213327420d2aff9",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
