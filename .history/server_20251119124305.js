// server.js
import app from "./src/app.js";

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

