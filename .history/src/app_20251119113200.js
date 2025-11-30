import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import sequelize from "./config/db.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use("/auth", authRoutes);

// Conectar Sequelize
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error("Error en DB:", err));

    import "./config/test.js";

export default app;
