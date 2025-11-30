import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Ruta para renderizar el formulario de registro
router.get("/register", (req, res) => {
  res.render("register", { user: registerUser });
});

// Ruta para procesar el registro (si quieres manejar POST)
router.post("/register", (req, res) => {
  // Aquí podrías guardar el usuario en la DB
  console.log(req.body);
  res.send("Registro recibido");
});

// Ruta para renderizar el formulario de login
router.get("/login", (req, res) => {
  res.render("login", { user: loginUser });
});

// Ruta para procesar el login (POST)
router.post("/login", (req, res) => {
  // Aquí podrías autenticar el usuario
  console.log(req.body);
  res.send("Login recibido");
});

export default router;
