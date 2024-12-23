import admin from "firebase-admin";
import { serviceAccount } from "./service-account-key.js";
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Error: ", error);
}

export default admin;
