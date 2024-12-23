import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

import "./Login.css";

function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log("Erfolgreich eingeloggt:", user.email);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-columns">
          <form onSubmit={handleLogin} className="login-section">
            <h2>Ich habe ein Konto:</h2>
            <div className="login-form">
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input-field"
              />
            </div>
            <div className="login-form">
              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input-field"
              />
            </div>
            <button onClick={handleLogin} className="btn-login">
              Anmelden
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className="login-section-right">
            <h2>Neukunden:</h2>
            <button
              onClick={() => navigate("/register")}
              className="btn-continue"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
