import db from "../config/bd.js";

export const createUser = async (nombre, apellido, correo, contrasena) => {
  const sql = `
    INSERT INTO Cuenta_usuario (username, email, clave)
    VALUES (?, ?, ?)
  `;

  await db.execute(sql, [`${nombre} ${apellido}`, correo, contrasena]);
};
