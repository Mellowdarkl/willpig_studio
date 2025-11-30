// src/controllers/auth.controller.js

import Usuario from "../models/Usuario.js";

export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  try {
    // Validar campos
    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    // Crear usuario en DB con Sequelize
    await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena,
    });

    console.log("Usuario registrado correctamente");
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error en el servidor");
  }
};
