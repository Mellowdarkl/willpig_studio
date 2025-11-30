import sequelize from "./src/config/db.js";
import Cuenta_usuario from "./src/models/Usuario.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la DB");

    await Cuenta_usuario.create({
      username: "LanAsprilla",
      apellido: "Asprilla",
      email: "lan@example.com",
      clave: "123456"
    });
    await Cuenta_usuario.create({
      username: "MiaGomez",
      apellido: "Gomez",
      email: "mia@example.com",
      clave: "abcdef"
    });

    console.log("Usuario agregado!");
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

seed();
