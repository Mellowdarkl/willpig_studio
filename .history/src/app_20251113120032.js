// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mainRoutes from "./routes/main.routes.js";

const app = express();

// Configurar rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Motor de vistas (carpeta fuera de /src)
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Rutas
app.use("/", mainRoutes);

export default app;
