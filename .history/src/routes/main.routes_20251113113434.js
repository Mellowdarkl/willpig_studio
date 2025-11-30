// src/routes/main.routes.js
import express from "express";
import { renderHome, renderLogin, renderRegister, renderBiblioteca } from "/src/controllers/main.conteoller";

const router = express.Router();

router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/biblioteca", renderBiblioteca);

export default router;
