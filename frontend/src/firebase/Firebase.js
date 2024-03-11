// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA67IjdGt7C1E1SBb1TXVTNJRpQgZIUsEM",
  authDomain: "dimepiece-755d8.firebaseapp.com",
  projectId: "dimepiece-755d8",
  storageBucket: "dimepiece-755d8.appspot.com",
  messagingSenderId: "993003952403",
  appId: "1:993003952403:web:7bd7061a1505861510a2e6",
  measurementId: "G-0DVELS5Y33",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export function testLog() {
  logEvent(analytics, "test");
}
