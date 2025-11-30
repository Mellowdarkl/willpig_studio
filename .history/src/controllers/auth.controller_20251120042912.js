import Usuario from "../models/Usuario.js";

// Registrar usuario
export async function registerUser(data) {
  const { nombre, apellido, correo, contrasena } = data;
  return await Usuario.create({
    nombre,
    apellido,
    email: correo,
    password: contrasena
  });
}

// Login
export async function loginUser(data) {
  const { correo, contrasena } = data;
  return await Usuario.findOne({
    where: { email: correo, password: contrasena }
  });
}
