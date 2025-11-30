import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", register);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", login);

export default router;
