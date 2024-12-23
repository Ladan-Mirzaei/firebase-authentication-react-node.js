// Dieser Code dient als Middleware für eine API, die den Zugriff auf bestimmte Routen
// nur für authentifizierte Benutzer ermöglicht. Es überprüft, ob der Benutzer ein gültiges
// Firebase-ID-Token in seinem Authorization-Header übermittelt hat, um seine Identität zu bestätigen.

import admin from "./firebaseAdmin.js";

const firebaseRequireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default firebaseRequireAuth;
