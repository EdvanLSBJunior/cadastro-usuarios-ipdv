import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/user.routes";
import userAdminRoutes from "./routes/user-admin.routes";
import roleRoutes from "./routes/role.routes";

dotenv.config();

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api", userRoutes);
  app.use("/api/admin/users", userAdminRoutes);
  app.use("/api/roles", roleRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
