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

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *    get:
 *        tags: ["Admin-Panel"]
 *        summary: get all children of parents category
 *        parameters:
 *          -  name: parent
 *             type: string
 *             requird: true
 *             in: path
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get("/children/:parent", CategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/all:
 *    get:
 *        tags: ["Admin-Panel"]
 *        summary: get all Categories
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *    delete:
 *        tags: ["Admin-Panel"]
 *        summary: remove category with object-id
 *        parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *        responses:
 *           200:
 *               description: success
 *
 */

router.delete("/remove/:id", CategoryController.remvoeCategory);

module.exports = {
  CategoryRoutes: router,
};
