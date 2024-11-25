const router = require("express").Router();
const bcrypt = require("bcrypt");
const { RandomNumberGenerator } = require("../utils/functions");

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

router.get("/password-hash/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.json({
    password_hashed: bcrypt.hashSync(password, salt),
  });
});

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

router.get("/random-number", (req, res, next) => {
  return res.json({
    random_number: RandomNumberGenerator().toString(),
  });
});



module.exports = {
  DeveloperRoutes: router,
};
