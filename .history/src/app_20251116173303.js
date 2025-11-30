import express from "express";
import path from "path";

const app = express();

// Necesario para formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(process.cwd(), "public")));

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

export default app;
