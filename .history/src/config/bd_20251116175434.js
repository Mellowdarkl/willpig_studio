/*
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testDB = async () => {  // ⬅ DEFINIMOS LA FUNCIÓN DE PRUEBA
  try {
    const connection = await pool.getConnection();
    console.log(" Conectado a la base de datos:", process.env.DB_NAME);
    connection.release();
  }  catch (error) {
    console.error(" Error al conectar con la base de datos:", error.message);
  }

};
export default pool;
*/

// src/config/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "willpigstudio", // nombre BD
  "root",          // usuario
  "root",          // contraseña
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
