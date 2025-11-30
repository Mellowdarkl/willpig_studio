import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) =>  res.render("register"));
res.render("register", registerUser);

router.post("/login",  (req, res) =>  res.render("login"));
res.render("login", loginUser);


export default router;
