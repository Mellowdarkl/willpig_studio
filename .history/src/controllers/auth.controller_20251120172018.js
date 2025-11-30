import Usuario from "../models/Usuario.js";

// Registrar usuario
export async function registerUser(data) {
  const { nombre, apellido, correo, clave } = data;
  return await Usuario.create({
    nombre,
    apellido,
    email: correo,
    password: clave
  });
}

// Login
export async function loginUser(data) {
  const { correo, clave } = data;
  return await Usuario.findOne({
    where: { email: correo, password: clave }
  });
}
