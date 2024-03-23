"use strict";

import { app } from "./app.js";

const port = process.env.APP_PORT || 3000;

app.listen(port, async () => {
  console.log(`listening on port ${port} ...`);
});
