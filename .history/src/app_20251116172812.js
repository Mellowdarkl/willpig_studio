import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mainRoutes from "./routes/main.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos HTML, CSS e imágenes
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static('public'));
// Rutas
app.use("/", mainRoutes);
app.use("/auth", authRoutes);   // /auth/login /auth/register
app.use("/user", userRoutes);


export default app;
