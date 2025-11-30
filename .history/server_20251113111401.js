import express from "express";
import dotenv from "dotenv";
import pool from "./src/config/db.js";

dotenv.config();
const app = express();

// Middleware base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba de conexión
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha_actual;");
    res.json({ conexion: "exitosa", fecha: rows[0].fecha_actual });
  } catch (error) {
    res.status(500).json({ error: "Error de conexión con la base de datos", detalle: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
