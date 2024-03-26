import { Router } from "express";
import { homeRoutes } from "./api/home_routes.js";
import { PostsRoutes } from "./api/posts_routes.js";

const apiRoutes = Router();

apiRoutes.use("/", homeRoutes);
apiRoutes.use("/posts", PostsRoutes);

export { apiRoutes };
