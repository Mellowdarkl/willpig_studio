// src/routes/main.routes.js
import express from "express";
import {
  renderHome,
  renderLogin,
  renderRegister,
  renderBiblioteca,
  renderNewStorys
} from "../controllers/main.controller.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/views/principal.ejs", renderHome);
router.get("/views/login.ejs", renderLogin);
router.get("/views/register.ejs", renderRegister);
router.get("/views/biblioteca.ejs", renderBiblioteca);
router.get("/views/newstorys.ejs", renderNewStorys);

export default router;
