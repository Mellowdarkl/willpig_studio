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
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/biblioteca", renderBiblioteca);
router.get("/newstorys", renderNewStorys);

import express from "express";

router.get("/", (req, res) => {
    res.render("pagprincipal"); // o la vista que quieras
});

export default router;

