import { Router } from "express";
import HomeController from "../../controllers/home_controller.js";
import ExampleMiddleWare from "../../middlewares/example.js";

const homeRoutes = Router();

homeRoutes.use(ExampleMiddleWare("example"));

homeRoutes.get("/", HomeController.index);

export { homeRoutes };
