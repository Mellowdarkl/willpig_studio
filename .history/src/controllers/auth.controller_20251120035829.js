// Importar dependencias
import bcrypt from "bcryptjs";
import { Usuario } from "../models/Usuario.js"; // Ajusta la ruta según tu proyecto

// REGISTRAR USUARIO
export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  try {
    // Validación de campos obligatorios
    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    // Generar username
    const username = `${nombre}_${apellido}`.toLowerCase();

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    await Usuario.create({
      username,
      email: correo,
      clave: hashedPassword,
      biografia: "",
    });

    console.log("Usuario registrado correctamente");
    res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error en el servidor");
  }
};

// INICIAR SESIÓN
export const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar usuario por correo
    const user = await Usuario.findOne({ where: { email: correo } });

    if (!user) {
      return res.render("login", { error: "Correo no registrado" });
    }

    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(contrasena, user.clave);

    if (!isMatch) {
      return res.render("login", { error: "Contraseña incorrecta" });
    }

    console.log("Inicio de sesión exitoso:", user.username);
    res.redirect("/pagprincipal");
  } catch (error) {
    console.error("Error en login:", error);
    res.render("login", { error: "Error en el servidor" });
  }
};
