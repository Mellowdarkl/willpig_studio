// src/routes/main.routes.js
import express from "express";
import { renderHome, renderLogin, renderRegister, renderBiblioteca, renderNewStorys, renderPagPrincipal } from "../controllers/main.controller.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/biblioteca", renderBiblioteca);
router.get("/newstorys", renderNewStorys);
router.get("/pagprincipal", renderPagPrincipal);

export default router;
