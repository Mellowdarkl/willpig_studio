import pool from "../config/bd.js";

// Crear capítulo
export const createChapter = async (req, res) => {
  const { titulo, contenido, cuento_id } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO Capitulos (titulo, contenido, Cuento_id)
       VALUES (?, ?, ?)`,
      [titulo, contenido, cuento_id]
    );

    res.status(201).json({ message: "Capítulo creado", id: result.insertId });

  } catch (error) {
    res.status(500).json({ error: "Error al crear capítulo" });
  }
};

// Obtener capítulos por cuento
export const getChapters = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM Capitulos WHERE Cuento_id = ? ORDER BY fecha_creado ASC`,
      [id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener capítulos" });
  }
};
