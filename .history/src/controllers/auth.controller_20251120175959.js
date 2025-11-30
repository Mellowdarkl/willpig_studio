import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

// --- registro ---
export const register = async (req, res) => {
  try {
    const { username, email, clave } = req.body;

    if (!username || !email || !clave) {
      return res.render("register", {
        error: "Todos los campos son obligatorios."
      });
    }

    // Verificar si ya existe el usuario
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.render("register", {
        error: "Ya existe una cuenta con este correo."
      });
    }

    const hash = await bcrypt.hash(clave, 10);

    // Crear usuario en la BD
    await Usuario.create({
      username,
      email,
      clave: hash
    });

    res.redirect("/auth/login");

  } catch (error) {
    console.log("Error al registrar usuario:", error);
    res.render("register", {
      error: "Hubo un error en el registro, intenta nuevamente."
    });
  }
};


// --- LOGIN (si lo necesitas después lo hacemos) ---
export const login = async (req, res) => {
  res.send("Login en construcción...");
};
