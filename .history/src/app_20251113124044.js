// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mainRoutes from "./routes/main.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", mainRoutes);

export default app;
