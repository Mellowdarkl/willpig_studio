// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar vistas (si usas EJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// RUTAS
app.use("/", authRoutes);

export default app;
