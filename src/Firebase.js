import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDyvB62JVXt_2sjL5cTpoN74nsOwf7_rIo",
  authDomain: "practiceproject-394605.firebaseapp.com",
  projectId: "practiceproject-394605",
  storageBucket: "practiceproject-394605.appspot.com",
  messagingSenderId: "959808681734",
  appId: "1:959808681734:web:260722dea80cf360301087",
  measurementId: "G-MPH7B7PB9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

