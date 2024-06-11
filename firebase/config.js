// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.PAINT_KIT_API_KEY,
  authDomain: process.env.PAINT_KIT_AUTH_DOMAIN,
  projectId: process.env.PAINT_KIT_PROJECT_ID,
  storageBucket: process.env.PAINT_KIT_STORAGE_BUCKET,
  messagingSenderId: process.env.PAINT_KIT_MESSAGING_SENDER_ID,
  appId: process.env.PAINT_KIT_APP_ID,
  measurementId: process.envPAINT_KIT_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);