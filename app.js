import express from "express";
import { apiRoutes } from "./src/routes/api_routes.js";

const app = express();
app.use(express.json());


app.use("/api/", apiRoutes);

app.use("/", (req, res) => res.send("WORKING"));

export { app };
