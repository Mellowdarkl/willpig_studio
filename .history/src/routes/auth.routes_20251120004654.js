import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) => res.render("register"));
router.post("/register", registerUser);

router.get("/login", (req, res) => res.render("login"));
router.post("/login", loginUser);

export default router;
