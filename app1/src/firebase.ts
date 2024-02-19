// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJhats9Y7yLqaSEXMUdPYeTEk_eM-D1Ss",
  authDomain: "sso1-5a4ad.firebaseapp.com",
  projectId: "sso1-5a4ad",
  storageBucket: "sso1-5a4ad.appspot.com",
  messagingSenderId: "622887376320",
  appId: "1:622887376320:web:beab57354ec4b2a4cee425"
};

// Initialize Firebase
//@ts-ignore
const app = initializeApp(firebaseConfig);
export const auth  = getAuth()
