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

router.get("/", renderHome)
router.get("/login.ejs", renderLogin);
router.get("/register.ejs", renderRegister);
router.get("/biblioteca.ejs", renderBiblioteca);
router.get("/newstorys.ejs", renderNewStorys);

export default router;
