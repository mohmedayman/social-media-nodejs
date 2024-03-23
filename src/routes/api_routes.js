import { Router } from "express";
import { homeRoutes } from "./api/home_routes.js";

const apiRoutes = Router();

apiRoutes.use("/", homeRoutes);

export { apiRoutes };
