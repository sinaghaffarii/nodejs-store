//tag1#tag2#tag_name
//string
//undefined

import { NextFunction, Request, Response } from "express";

export const stringToArray = function (field: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.body[field]) {
      if (typeof req.body[field] == "string") {
        if (req.body[field].indexOf("#") >= 0) {
          req.body[field] = req.body[field].split("#").map((item) => item.trim());
        } else if (req.body[field].indexOf(",") >= 0) {
          req.body[field] = req.body[field].split(",").map((item) => item.trim());
        } else {
          req.body[field] = [req.body[field]];
        }
      }
      if (Array.isArray(req.body[field])) {
        req.body[field] = req.body[field].map((item: any) => item.trim());
        req.body[field] = [...new Set(req.body[field])];
      }
    } else {
      req.body[field] = [];
    }
    next();
  };
};
