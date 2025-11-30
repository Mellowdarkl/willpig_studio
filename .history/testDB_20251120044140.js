import sequelize from "./src/config/db.js";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("No se pudo conectar:", error);
  }
}

testConnection();
