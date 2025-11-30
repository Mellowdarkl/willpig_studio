import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Procesar registro
router.post("/register", register);

// Mostrar formulario de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Procesar login
router.post("/login", login);

export default router;
