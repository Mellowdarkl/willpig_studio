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

import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

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