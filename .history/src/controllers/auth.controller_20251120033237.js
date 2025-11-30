import Usuario from "../models/Usuario.js";

// Registrar usuario
export async function registerUser(data) {
  const { nombre, email, password } = data;
  return await Usuario.create({ nombre, email, password });
}

// Login
export async function loginUser(data) {
  const { email, password } = data;
  return await Usuario.findOne({ where: { email, password } });
}
