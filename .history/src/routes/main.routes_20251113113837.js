// src/routes/main.routes.js
import express from "express";
import { renderHome, renderLogin, renderRegister, renderBiblioteca } from "/src/controllers/main.conteoller";

const router = express.Router();

router.get("/", renderHome);
router.get("/views/login.ejs", renderLogin);
router.get("/views/register.ejs", renderRegister);
router.get("/views/biblioteca.ejs", renderBiblioteca);
router.get("/views/pagprincipal.ejs", rederpagprincipal);
router.get("/views/newstorys.ejs", rederpagprincipal);

export default router;
