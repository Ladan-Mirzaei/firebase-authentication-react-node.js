import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user, loading, signUp } = useContext(AuthContext);
  const [error, setError] = useState("");

  const db = getFirestore();

  const handleRegister = async () => {
    if (!firstName) {
      setError("Vorname darf nicht leer sein.");
      return;
    }

    if (loading) {
      return;
    }

    try {
      // Register the user
      const registeredUser = await signUp({ email, password });

      console.log(
        "Benutzer registriert und eingeloggt:",
        registeredUser.email,
        registeredUser
      );

      // Create user document in Firestore
      await setDoc(doc(db, "users", registeredUser.uid), {
        firstName: firstName,
        lastName: lastName,
      });

      navigate("/userinfo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-section">
          <h2>Neukunden:</h2>
          <div className="login-form">
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Vorname*"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nachname"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail*"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort*"
              className="login-input-field"
            />
          </div>

          <br />

          <button
            onClick={handleRegister}
            className="btn-login"
            disabled={loading}
          >
            {loading ? "Registrieren..." : "Registrieren"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="login-section-right">
          <h2>Ich habe bereits ein Konto:</h2>
          <button onClick={() => navigate("/login")} className="btn-continue">
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
