import Usuario from "../models/Usuario.js";

export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  // Crear un username automático a partir del nombre y apellido
  const username = `${nombre}_${apellido}`.toLowerCase();

  try {
    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    // Guardar en la base de datos
    await Usuario.create({
      username: username,     // obligatorio en tabla
      email: correo,          // mapeado
      clave: contrasena,      // mapeado
      biografia: "",          // opcional
    });

    console.log("Usuario registrado correctamente");
    res.redirect("/login"); // redirige después de registrar

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error en el servidor");
  }
};
