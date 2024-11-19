const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para registrar un nuevo usuario
router.post("/register", register);

module.exports = router;