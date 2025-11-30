import Usuario from "../models/usuario.js";
// import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  const username = `${nombre}_${apellido}`.toLowerCase();

  try {
    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }


    await Usuario.create({
      username: username,
      email: correo,
      clave: contrasena,
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
    const user = await Usuario.findOne({ where: { email: correo } });

    if (!user) {
      return res.render("login", { error: "Correo no registrado" });
    }

    if (user.clave !== contrasena) {
      return res.render("login", { error: "Contraseña incorrecta" });
    }

    console.log("Inicio de sesión exitoso:", user.username);


    res.redirect("/pagprincipal");

  } catch (error) {
    console.error("Error en login:", error);
    res.render("login", { error: "Error en el servidor" });
  }
};
