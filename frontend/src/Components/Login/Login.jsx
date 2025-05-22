import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import du fichier CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/users/login", {
        email,
        password,
      })
      .then((response) => {
        alert("Connexion réussie");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la connexion");
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Connexion</h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button onClick={handleLogin} className="login-button">
        Se connecter
      </button>

      <p className="login-register-text">
        Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
      </p>
    </div>
  );
};

export default Login;
