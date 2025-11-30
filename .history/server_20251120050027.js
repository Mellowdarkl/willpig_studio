// server.js
import app from "./src/app.js";

import sequelize from "./src/config/db.js";
import Usuario from "./src/models/Usuario.js";

sequelize.sync({ alter: true })
  .then(() => console.log("Tablas sincronizadas correctamente"))
  .catch(err => console.error("Error sincronizando tablas:", err));


app.listen(2000, () => {
  console.log("Servidor corriendo en http://localhost:2000");
});

