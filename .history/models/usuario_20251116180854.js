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

    // src/models/Usuario.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define(
  "Cuenta_usuario",
  {
    idCuenta_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    clave: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    avatar_url: {
      type: DataTypes.STRING,
      defaultValue: "/public/img/img.ico/user-icon.png",
    },

    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    rol: {
      type: DataTypes.ENUM("lector", "escritor", "admin", "moderador"),
      defaultValue: "lector",
    },

    estado: {
      type: DataTypes.ENUM("activa", "suspendida", "deshabilitada"),
      defaultValue: "activa",
    },
  },
  {
    tableName: "Cuenta_usuario",
    timestamps: false, // tu tabla no tiene createdAt/updatedAt con Sequelize
  }
);
// Sincronizar el modelo con la base de datos