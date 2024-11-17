const HomeController = require("../../http/controllers/api/Home.controller");

const router = require("express").Router();


/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: apis for index page
*/

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Not Found
*/

router.get("/", HomeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
