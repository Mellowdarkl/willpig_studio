// server.js
import dotenv from "dotenv";
import app from "./src/app.js";
import { testDB } from "./src/config/bd.js"; // ⬅ IMPORTAMOS LA FUNCIÓN DE PRUEBA


dotenv.config();

testDB(); // ⬅ LLAMAMOS PRUEBA

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

