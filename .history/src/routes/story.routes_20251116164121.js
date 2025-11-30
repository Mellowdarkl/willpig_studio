import { Router } from "express";
import { createStory, getStories, getStoriesByCategory } from "../controllers/story.controller.js";

const router = Router();

router.post("/new", createStory);
router.get("/", getStories);
router.get("/category/:id", getStoriesByCategory);

export default router;
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
    res.status(500).json({ error: "Error al obtener cuento" });
  }
};