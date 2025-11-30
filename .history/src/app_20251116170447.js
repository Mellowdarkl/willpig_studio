// src/app.js
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import sequelize from "./config/db.js";

const app = express();

// Para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use(authRoutes);

// Probar BD
sequelize.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.log("Error BD:", err));

export default app;
