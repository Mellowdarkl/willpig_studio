
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "willpigstudio", // nombre BD
  "root",          // usuario
  "root",          // contraseña
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
