import { createUser } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  try {
    await createUser(nombre, apellido, correo, contrasena);
    res.redirect("/html/login.html");  // después de registrarse
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
};
