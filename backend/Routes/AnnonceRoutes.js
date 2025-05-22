const express = require("express");
const router = express.Router();
const {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
} = require("../Controllers/AnnonceController");

const authMiddleware = require("../Middlewares/authMiddleware");

// Routes publiques
router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);

// Routes protégées
router.post("/", authMiddleware, createAnnonce);
router.put("/:id", authMiddleware, updateAnnonce);
router.delete("/:id", authMiddleware, deleteAnnonce);

module.exports = router;
