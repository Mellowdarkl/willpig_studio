const express = require("express");
const path = require("path");
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true })); // para leer formularios
app.use(express.json()); // para JSON
app.use(express.static(path.join(__dirname, "../public"))); // archivos estáticos

// Rutas
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

module.exports = app;

