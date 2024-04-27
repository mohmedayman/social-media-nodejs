"use strict";
export default function (options) {
  return function (req, res, next) {
    req.options = options;
    
    next();
  };
}
