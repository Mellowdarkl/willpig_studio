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

    email: {                       // coincide con tu CREATE TABLE
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    clave: {                       // coincide con tu CREATE TABLE
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
      type: DataTypes.ENUM("lector", "admin", "moderador"), // ajustado a tu SQL
      defaultValue: "lector",
    },

    estado: {
      type: DataTypes.ENUM("activa", "suspendida", "deshabilitada"),
      defaultValue: "activa",
    },

    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    Seguimiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // seguro: se creará/asegurará en server.js
    },
  },
  {
    tableName: "Cuenta_usuario",
    timestamps: false,
  }
);

export default Usuario;
