import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Mostrar formulario de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Procesar registro
router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body);   // Guardar usuario en DB
    res.redirect("/auth/login");    // Redirigir al login después del registro
  } catch (error) {
    console.error(error);
    res.render("register", { error: "Error al registrar usuario" });
  }
});

// Mostrar formulario de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Procesar login
router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    if (user) {
      res.send("¡Login exitoso!");  // Aquí luego puedes redirigir a un dashboard
    } else {
      res.render("login", { error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error(error);
    res.render("login", { error: "Error al iniciar sesión" });
  }
});

export default router;
