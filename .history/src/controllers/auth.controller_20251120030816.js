import Usuario from "../models/Usuario.js";

export async function registerUser(data) {
  const { nombre, email, password } = data;
  try {
    // Inserta el usuario en la DB
    const newUser = await Usuario.create({ nombre, email, password });
    return newUser;
  } catch (error) {
    throw error;
  }
}
