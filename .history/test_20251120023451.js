import sequelize from "./config/bd.js"; // Ajusta la ruta

async function testConexion() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con éxito!");
    process.exit();
  } catch (error) {
    console.error("Error de conexión:", error);
  }
}

testConexion();
