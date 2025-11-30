import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getProfile);

export default router;
