
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWP1EboxahAQ9I5olMrjaKokajty6ECBc",
  authDomain: "fir-gs-d8463.firebaseapp.com",
  projectId: "fir-gs-d8463",
  storageBucket: "fir-gs-d8463.appspot.com",
  messagingSenderId: "462298845491",
  appId: "1:462298845491:web:7b8cdab24da5d868f6ee46"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app)

export { app, db }