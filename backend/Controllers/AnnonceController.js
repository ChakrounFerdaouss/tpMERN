const Annonce = require("../Models/AnnonceModel");

// Créer une annonce
const createAnnonce = async (req, res) => {
  try {
    const annonce = new Annonce({
      ...req.body,
      author: req.user._id, // L'auteur est l'utilisateur connecté
    });

    await annonce.populate("author", "name email");

    await annonce.save();
    res.status(201).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupérer toutes les annonces avec filtre et populate
const getAnnonces = async (req, res) => {
  try {
    const filters = {};

    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: "i" };
    }

    if (req.query.content) {
      filters.content = { $regex: req.query.content, $options: "i" };
    }

    if (req.query.author) {
      filters.author = req.query.author;
    }

    const annonces = await Annonce.find(filters).populate(
      "author",
      "email name"
    );

    // ➕ Si une recherche par nom d’auteur est demandée
    let filteredAnnonces = annonces;
    if (req.query.authorName) {
      const regex = new RegExp(req.query.authorName, "i"); // insensible à la casse
      filteredAnnonces = annonces.filter((ann) =>
        regex.test(ann.author.name)
      );
    }

    res.status(200).send(filteredAnnonces);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Récupérer une annonce par son ID
const getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id).populate(
      "author",
      "email name"
    );

    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    res.status(200).send(annonce);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Mettre à jour une annonce
const updateAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    if (annonce.author.toString() !== req.user._id) {
      return res.status(403).send({ error: "Unauthorized" });
    }

    Object.assign(annonce, req.body);
    await annonce.save();

    res.status(200).send({ message: "Annonce updated", annonce });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Supprimer une annonce
const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).send({ error: "Annonce not found" });
    }

    if (annonce.author.toString() !== req.user._id) {
      return res.status(403).send({ error: "Unauthorized" });
    }

    await annonce.deleteOne();

    res.status(200).send({ message: "Annonce deleted", annonce });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
};
