
"use strict";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/config/db.js";

dotenv.config();


const port = process.env.APP_PORT || 5000;

app.listen(port, async () => {
  console.log(`tg on port ${port} ...`);
  await connectDB(process.env.DATABASE_URI);
  
  console.log(`listening on port ${port} ...`);
});

