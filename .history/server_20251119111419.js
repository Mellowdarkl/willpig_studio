// server.js
/* import app from "./src/app.js";

app.listen(2000, () => {
  console.log("Servidor corriendo en http://localhost:2000");
}); */

import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para usar res.render()
app.set("view engine", "ejs");

// Ruta de las vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "src", "views"));

// Middleware para formularios
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/auth", authRoutes);

// Levantar servidor
app.listen(2000, () => console.log("Servidor en http://localhost:2000"));

