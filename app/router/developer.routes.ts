import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { RandomNumberGenerator } from "@/utils/functions";

const router = Router();

/**
 * @swagger
 *   tags:
 *       name: Developer-Routes
 *       description: Developer Utils
 */

/**
 * @swagger
 *   /developer/password-hash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
const hashPassword = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  res.json({
    password_hashed: bcrypt.hashSync(password, salt),
  });
};

router.get("/password-hash/:password", hashPassword);

/**
 * @swagger
 *   /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: Get Random Number
 *          responses:
 *              200:
 *                  description: success
 */

const randomNumber = (req: Request, res: Response, next: NextFunction): any => {
  return res.json({
    random_number: RandomNumberGenerator().toString(),
  });
};

router.get("/random-number", randomNumber);

export const DeveloperRoutes = router;
