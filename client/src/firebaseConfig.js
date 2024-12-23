import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// Firebase-Konfiguration aus der Firebase-Konsole
const firebaseConfig = {
  apiKey: "AIzaSyAHELzl3-1R9_OmIeXZJQ7-5pcl0IvGo8s",
  authDomain: "smartbite-48376.firebaseapp.com",
  projectId: "smartbite-48376",
  storageBucket: "smartbite-48376.appspot.com",
  messagingSenderId: "747414528072",
  appId: "1:747414528072:web:d68afaf259564a4443387d",
};

// Firebase initialisieren
// Diese Funktion initialisiert eine Firebase-App mit den in firebaseConfig definierten
// Konfigurationsparametern.
// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firestore
// const db = getFirestore(app);

// Exportiere die Instanzen von Auth und Firestore, um sie in anderen Dateien zu verwenden
export const auth = getAuth(app); // Für Authentifizierung
// export { db };
export default app;
