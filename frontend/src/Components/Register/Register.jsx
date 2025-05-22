import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/users/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => {
        alert("Compte créé avec succès");
        navigate("/");
      })
      .catch((error) => {
        alert("Erreur lors de la création du compte");
      });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Créer votre compte</h1>
      <input
        className="register-input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="register-input"
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
