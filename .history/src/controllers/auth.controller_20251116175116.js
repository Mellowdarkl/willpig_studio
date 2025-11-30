export const registerUser = (req, res) => {
    const datos = req.body;
    console.log("Datos recibidos:", datos);
    
    // Aquí procesas y guardas en la BD
    res.send("Usuario registrado");
};

// src/controllers/auth.controller.js

const db = require('../config/db'); // tu conexión a MySQL

// CONTROLADOR PARA REGISTRO
exports.registerUser = (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body;

    // Validar que los campos vengan
    if (!nombre || !apellido || !correo || !contrasena) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    // Insertar en MySQL
    const sql = `INSERT INTO usuarios (nombre, apellido, correo, contrasena)
                VALUES (?, ?, ?, ?)`;

    db.query(sql, [nombre, apellido, correo, contrasena], (err, result) => {
        if (err) {
            console.error("Error al registrar usuario:", err);
            return res.status(500).send("Hubo un error en el servidor");
        }

        console.log("Usuario registrado ID:", result.insertId);
        res.redirect("/login"); // redirige después del registro
    });
};


import Usuario from "../models/Usuario.js";
  const { nombre, apellido, correo, contrasena } = req.body;

  try {
    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    // Crear usuario
    await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena,
    });

    res.redirect("/login"); // redirige después del registro
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};
