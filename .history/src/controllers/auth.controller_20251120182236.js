import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

// --- REGISTRO ---
export const register = async (req, res) => {
  try {
    const { username, correo, contrasena } = req.body;

    // Validación básica
    if (!username || !correo || !contrasena) {
      return res.render("register", {
        error: "Todos los campos son obligatorios."
      });
    }

    // Verificar si ya existe el usuario
    const existeUsuario = await Usuario.findOne({ where: { correo } });
    if (existeUsuario) {
      return res.render("register", {
        error: "Ya existe una cuenta con este correo."
      });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    // Crear usuario en la BD
    await Usuario.create({
      username,
      correo,
      contrasena: hash
    });

    // Redirigir al login
    res.redirect("/auth/login");

  } catch (error) {
    console.log("Error al registrar usuario:", error);
    res.render("register", {
      error: "Hubo un error en el registro, intenta nuevamente."
    });
  }
};



// --- LOGIN (lo terminamos después) ---
export const login = async (req, res) => {
  res.send("Login en construcción...");
};
