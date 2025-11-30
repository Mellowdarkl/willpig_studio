import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import sequelize from "./config/db.js";
import "./config/test.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// 👉 Ruta raíz para evitar error Cannot GET /
app.get("/", (req, res) => {
  res.redirect("/register");
});

// 👉 Esto conecta tus rutas de auth
app.use("/auth", authRoutes);

// Conectar Sequelize
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error("Error en DB:", err));

export default app;
