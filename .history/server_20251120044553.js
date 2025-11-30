// server.js
import app from "./src/app.js";

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");

    app.listen(2000, () => {
      console.log("Servidor corriendo en http://localhost:2000");
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

startServer();