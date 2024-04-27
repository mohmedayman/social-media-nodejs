import { Router } from "express";
import { homeRoutes } from "./api/home_routes.js";
import { PostsRoutes } from "./api/posts_routes.js";
import { UsersRoutes } from "./api/users_routes.js";
import { CommentsRoutes } from "./api/comments_routes.js";
const apiRoutes = Router();

apiRoutes.use("/", homeRoutes);
apiRoutes.use("/posts", PostsRoutes);
apiRoutes.use("/users", UsersRoutes);
apiRoutes.use("/comments", CommentsRoutes);

export { apiRoutes };
