// src/models/Usuario.js

import { DataTypes } from "sequelize";
import sequelize from "./config/db.js";

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
      defaultValue: "/img/img.ico/user-icon.png",
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
    timestamps: false,
  }
);

export default Usuario;
