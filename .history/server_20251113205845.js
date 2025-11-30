// server.js
/*
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
*/

// server.js
import dotenv from "dotenv";
import app from "./src/app.js";
import pool from "./src/config/bd.js"; // ⬅ IMPORTAMOS LA BD

dotenv.config();

// ===============================
// 🔹 PROBAR CONEXIÓN A LA BASE DE DATOS
// ===============================
const testDB = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    console.log("🟢 Base de datos conectada correctamente:", rows[0]);
  } catch (err) {
    console.error("🔴 Error al conectar a la base de datos:", err);
  }
};

testDB(); // ⬅ Ejecutamos la prueba

// ===============================
// 🔹 INICIAR SERVIDOR
// ===============================
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
