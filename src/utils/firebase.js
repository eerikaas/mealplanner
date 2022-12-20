import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqRkVEJtikbCq3ClJ-cnFp_UOFflM1prI",
  authDomain: "mealplanner-e0f27.firebaseapp.com",
  databaseURL: "https://mealplanner-e0f27-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mealplanner-e0f27",
  storageBucket: "mealplanner-e0f27.appspot.com",
  messagingSenderId: "744958517855",
  appId: "1:744958517855:web:5a37b00c3fcb9d7c9f31ea",
  measurementId: "G-SXVPLZ1BJR"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db };
