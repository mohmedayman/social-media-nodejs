"use strict";

import { app } from "./app.js";
import CommentsController from "./src/controllers/comments_controller.js";
import CommentsController from "./src/controllers/posts_controller.js";

const port = process.env.APP_PORT || 3000;

app.listen(port, async () => {
  console.log(`listening on port ${port} ...`);
});
