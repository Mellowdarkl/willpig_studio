import { Router } from "express";
import { createStory, getStories, getStoriesByCategory } from "../controllers/story.controller.js";

const router = Router();

router.post("/new", createStory);
router.get("/", getStories);
router.get("/category/:id", getStoriesByCategory);

export default router;
