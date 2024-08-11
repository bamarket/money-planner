// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARVZXRL2HnqB_Ny7giManewn-OVAo5TVc",
  authDomain: "chatapp-b08cb.firebaseapp.com",
  databaseURL: "https://chatapp-b08cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapp-b08cb",
  storageBucket: "chatapp-b08cb.appspot.com",
  messagingSenderId: "117872551853",
  appId: "1:117872551853:web:87368bda6a7397253c2324",
  measurementId: "G-ZCFQ5LMZVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const analytics = typeof window !== 'undefined' && getAnalytics(app); // Ensure analytics is only initialized in the browser

export { storage, analytics };