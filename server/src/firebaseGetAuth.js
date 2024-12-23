// Der Code ist eine Middleware-Funktion, die versucht, die Authentifizierung eines
// Benutzers zu überprüfen, aber nicht zwingend erfordert, dass der Benutzer authentifiziert ist.
// Wenn ein Benutzer ein gültiges Firebase-ID-Token übermittelt, wird dieses Token verifiziert
// und die Benutzerinformationen werden der Anfrage (req.user) hinzugefügt. Wenn kein Token vorhanden
// ist oder das Token ungültig ist, wird die Anfrage einfach ohne Änderung fortgesetzt.
import admin from "./firebaseAdmin.js";

const firebaseGetAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
  } else {
    const idToken = authHeader.split("Bearer ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log("Auth error", error);
      next();
    }
  }
};
export default firebaseGetAuth;
