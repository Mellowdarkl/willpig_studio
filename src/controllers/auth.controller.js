// src/controllers/auth.controller.js
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, correo, contrasena } = req.body;

    if (!username || !correo || !contrasena) {
      return res.render("register", { error: "Todos los campos son obligatorios." });
    }

    // verificar email o username duplicado
    const exists = await Usuario.findOne({
      where: {
        // chequea por email o username
        // preferimos email como identificador único
        email: correo
      }
    });
    if (exists) {
      return res.render("register", { error: "Ya existe una cuenta con este correo." });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    // Crear usuario — fecha_registro y Seguimiento_id usan defaults del modelo
    await Usuario.create({
      username,
      email: correo,
      clave: hash
      // avatar_url, rol, estado se llenan por default
    });

    return res.redirect("/auth/login");
  } catch (err) {
    console.error("Error en register:", err);
    return res.render("register", { error: "Hubo un error en el registro, intenta nuevamente." });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.render("login", { error: "Completa los campos." });
    }

    const user = await Usuario.findOne({ where: { email: correo } });
    if (!user) return res.render("login", { error: "Usuario o contraseña incorrectos." });

    const ok = await bcrypt.compare(contrasena, user.clave);
    if (!ok) return res.render("login", { error: "Usuario o contraseña incorrectos." });

    // TODO: crear sesión/JWT — por ahora:
    return res.send("¡Login exitoso!");
  } catch (err) {
    console.error("Error en login:", err);
    return res.render("login", { error: "Error al iniciar sesión." });
  }
};
