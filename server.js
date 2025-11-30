// server.js
import app from "./src/app.js";
import sequelize from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import { QueryTypes } from "sequelize";

app.use("/auth", authRoutes);

// Antes de sync: asegurarnos que exista la tabla Seguimiento y al menos 1 fila
async function ensureSeguimiento() {
  try {
    // crear tabla si no existe y/o insertar fila inicial
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Seguimiento (
        idSeguimiento INT AUTO_INCREMENT PRIMARY KEY,
        fecha DATE NOT NULL
      ) ENGINE=InnoDB;
    `);

    // Si no hay filas, insertar una
    const rows = await sequelize.query("SELECT COUNT(*) as cnt FROM Seguimiento", { type: QueryTypes.SELECT });
    const cnt = rows && rows[0] && (rows[0].cnt ?? rows[0].CNT ?? rows[0].COUNT) || 0;
    if (parseInt(cnt) === 0) {
      await sequelize.query("INSERT INTO Seguimiento (fecha) VALUES (CURDATE())");
      console.log("Fila inicial de Seguimiento creada.");
    }
  } catch (err) {
    console.error("Error asegurando Seguimiento:", err);
    throw err;
  }
}

async function start() {
  try {
    await ensureSeguimiento();

    // sincroniza modelos (alter para ajustes leves)
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente");

    app.listen(2000, () => console.log("Servidor corriendo en http://localhost:2000"));
  } catch (err) {
    console.error("Error arrancando la app:", err);
    process.exit(1);
  }
}

start();
