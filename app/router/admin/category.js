const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: ["Admin-Panel"]
 *          summary: create new category title
 *          parameters:
 *          -  name: title
 *             type: string
 *             requird: true
 *             in: formData
 *          -  name: parent
 *             type: string
 *             require: false
 *             in: formData
 *          responses:
 *              201:
 *                  description: success
 */

router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *    get:
 *        tags: ["Admin-Panel"]
 *        summary: get all parents of category or category heads
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get("/parents", CategoryController.getAllParents);

module.exports = {
  CategoryRoutes: router,
};
