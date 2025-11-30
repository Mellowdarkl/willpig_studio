// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mainRoutes from "./routes/main.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "../public")));

// Rutas principales
app.use("/", mainRoutes);

export default app;
