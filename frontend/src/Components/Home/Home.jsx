import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./Home.css";

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = () => {
    axios
      .get("http://localhost:8080/annonces", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAnnonces(res.data))
      .catch((err) => console.error("Erreur chargement annonces :", err));
  };

  const handleCreateAnnonce = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/annonces",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setTitle("");
        setContent("");
        fetchAnnonces();
      })
      .catch((err) => console.error("Erreur création annonce :", err));
  };

  const handleDeleteAnnonce = (id) => {
    axios
      .delete(`http://localhost:8080/annonces/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => fetchAnnonces())
      .catch((err) => console.error("Erreur suppression annonce :", err));
  };

  return (
    <div className="container">
      <h1>Liste des annonces</h1>

      <form onSubmit={handleCreateAnnonce} className="publication-form">
        <input
          type="text"
          placeholder="Titre de l'annonce"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenu..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />
        <button type="submit">Créer une annonce</button>
      </form>

      <ul className="publication-list">
        {annonces.map((annonce) => (
          <li key={annonce._id} className="publication-item">
            <p><strong>Auteur :</strong> {annonce.author?.name}</p>
            <p><strong>Titre :</strong> {annonce.title}</p>
            <p>{annonce.content}</p>

            {annonce.author?._id === userId && (
              <button onClick={() => handleDeleteAnnonce(annonce._id)}>
                Supprimer
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
