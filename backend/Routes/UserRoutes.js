const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getUsers,
} = require("../Controllers/UserController");

const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protéger cette route avec le middleware
router.get("/all", authMiddleware, getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
