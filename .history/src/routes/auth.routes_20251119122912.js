import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", registerUser);

export default routes;