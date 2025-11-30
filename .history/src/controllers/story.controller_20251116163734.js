import pool from "../config/bd.js";

// Crear cuento
export const createStory = async (req, res) => {
  const { titulo, resumen, url_portada, categoria_id, usuario_id } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO Cuentos (titulo, resumen, url_portada, Cuenta_usuario_id, Categoria_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, resumen, url_portada, usuario_id, categoria_id]
    );

    res.status(201).json({ message: "Cuento creado", id: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cuento" });
  }
};

// Obtener todos los cuentos
export const getStories = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT C.idCuento, C.titulo, C.resumen, C.url_portada, C.estado,
              CU.username AS autor, CA.nombre AS categoria
       FROM Cuentos C
       LEFT JOIN Cuenta_usuario CU ON C.Cuenta_usuario_id = CU.idCuenta_usuario
       LEFT JOIN Categorias CA ON C.Categoria_id = CA.idCategoria
       ORDER BY C.fecha_creada DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cuentos" });
  }
};

// Cuentos por categoría
export const getStoriesByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT titulo, resumen, url_portada
       FROM Cuentos WHERE Categoria_id = ?`,
      [id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cuentos de categoría" });
  }
};
// Obtener detalle de un cuento
export const getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT C.idCuento, C.titulo, C.resumen, C.url_portada, C.estado,
              CU.username AS autor, CA.nombre AS categoria
       FROM Cuentos C
       LEFT JOIN Cuenta_usuario CU ON C.Cuenta_usuario_id = CU.idCuenta_usuario
       LEFT JOIN Categorias CA ON C.Categoria_id = CA.idCategoria
       WHERE C.idCuento = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Cuento no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalle del cuento" });
  }
};

// Actualizar cuento
export const updateStory = async (req, res) => {
  const { id } = req.params;
  const { titulo, resumen, url_portada, categoria_id, estado } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Cuentos
       SET titulo = ?, resumen = ?, url_portada = ?, Categoria_id = ?, estado = ?
       WHERE idCuento = ?`,
      [titulo, resumen, url_portada, categoria_id, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cuento no encontrado" });
    }

    res.json({ message: "Cuento actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar cuento" });
  }
};