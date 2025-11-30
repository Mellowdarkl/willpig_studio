import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Usuario;
// Sincronizar el modelo con la base de datos
Usuario.sync()
    .then(() => {
        console.log("Tabla de usuarios sincronizada");
    })
    .catch((error) => {
        console.error("Error al sincronizar la tabla de usuarios:", error);
    });