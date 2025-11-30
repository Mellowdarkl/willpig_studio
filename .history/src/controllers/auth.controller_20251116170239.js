// src/controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena } = req.body;

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).send("El correo ya está registrado");
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    await User.create({
      nombre,
      apellido,
      correo,
      contrasena: hashedPassword,
    });

    // Éxito
    res.redirect("/login"); // O lo que tú quieras

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
};
