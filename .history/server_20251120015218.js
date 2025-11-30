// server.js
import app from "./src/app.js";

app.listen(2000, () => {
  console.log("Servidor corriendo en http://localhost:2000");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// RUTAS
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(port, () => console.log("Servidor en puerto " + port));