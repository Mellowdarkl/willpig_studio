import pool from "../config/bd.js";
import bcrypt from "bcrypt";

// Registro
export const registerUser = async (req, res) => {
  const { username, email, clave } = req.body;

  try {
    const hashedPass = await bcrypt.hash(clave, 10);

    const [result] = await pool.query(
      `INSERT INTO Cuenta_usuario (username, email, clave)
       VALUES (?, ?, ?)`,
      [username, email, hashedPass]
    );

    res.status(201).json({ message: "Usuario registrado", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, clave } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM Cuenta_usuario WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(clave, user.clave);

    if (!valid) return res.status(401).json({ error: "Clave incorrecta" });

    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.idCuenta_usuario,
        username: user.username,
        email: user.email,
        rol: user.rol,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener perfil
export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT username, email, biografia, avatar_url, rol
       FROM Cuenta_usuario WHERE idCuenta_usuario = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};
// Actualizar perfil
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, biografia, avatar_url } = req.body;

  try {
    await pool.query(
      `UPDATE Cuenta_usuario
       SET username = ?, biografia = ?, avatar_url = ?
       WHERE idCuenta_usuario = ?`,
      [username, biografia, avatar_url, id]
    );

    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};