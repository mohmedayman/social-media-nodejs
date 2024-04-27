import express from "express";
import path from "path";
import { apiRoutes } from "./src/routes/api_routes.js";
import UserController from "./src/controllers/users_controller.js";
import connectDB from "./src/config/db.js";
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 5000;



// Parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

// API routes
app.use("/api/", apiRoutes);






export { app };
