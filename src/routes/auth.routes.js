import express from "express";
import { viewRegister, viewLogin, forgotPassword } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", viewRegister);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", viewLogin);

// new routes for password recovery
router.get("/olvido", (req, res) => {
  res.render("olvido");
});

router.post("/olvido", forgotPassword);

export default router;
