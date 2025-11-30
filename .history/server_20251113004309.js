import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Configurar rutas absolutas
const __dirname = path.resolve();

// 🖼️ Configurar motor de vistas (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🧱 Middleware para archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, "public")));

// 🧠 Middleware para leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 📄 Rutas principales
app.get("/views", (req, res) => {
  res.render("pagprincipal"); // tu archivo paginaprincipal.ejs
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/biblioteca", (req, res) => {
  res.render("biblioteca");
});

app.get("/newstorys", (req, res) => {
  res.render("newstorys");
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
  