<<<<<<< HEAD:server/src/middlewares/example.js
"use strict";
export default function (options) {
  return function (req, res, next) {
    req.options = options;

    next();
  };
}
=======
"use strict";
export default function (options) {
  return function (req, res, next) {
    req.options = options;
    
    next();
  };
}
>>>>>>> 4ebb730306b5e0f0c0daa4545b5f3b19a04b4af6:src/middlewares/example.js
