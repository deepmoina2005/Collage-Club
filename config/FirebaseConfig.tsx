// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//@ts-ignore
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6cOn6R9_zIyRT93DRsfUuzRQMAsTnlc0",
  authDomain: "collage-app-c52c8.firebaseapp.com",
  projectId: "collage-app-c52c8",
  storageBucket: "collage-app-c52c8.firebasestorage.app",
  messagingSenderId: "950212630082",
  appId: "1:950212630082:web:69b0faef115e0cc034bfdb",
  measurementId: "G-XJS2C52N09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const analytics = getAnalytics(app);