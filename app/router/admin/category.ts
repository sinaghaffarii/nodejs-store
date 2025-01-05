import AdminCategoryController from "@/http/controllers/admin/category.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                    type: string
 *                    description: the title of category
 *                  parent:
 *                    type: string
 *                    description:  the parent of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: ["Category(AdminPanel)"]
 *          summary: create new category title
 *          requestBody:
 *               required: true
 *               content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Category"
 *          responses:
 *              201:
 *                  description: success
 */

router.post("/add", AdminCategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *    get:
 *        tags: ["Category(AdminPanel)"]
 *        summary: get all parents of category or category heads
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get("/parents", AdminCategoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *    get:
 *        tags: ["Category(AdminPanel)"]
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

router.get("/children/:parent", AdminCategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/all:
 *    get:
 *        tags: ["Category(AdminPanel)"]
 *        summary: get all Categories
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get("/all", AdminCategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *    delete:
 *        tags: ["Category(AdminPanel)"]
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

router.delete("/remove/:id", AdminCategoryController.remvoeCategory);

/**
 * @swagger
 *  /admin/category/list-of-all:
 *    get:
 *        tags: ["Category(AdminPanel)"]
 *        summary: get all categories without populate nested structure
 *        responses:
 *           200:
 *               description: success
 *
 */

router.get(
  "/list-of-all",
  AdminCategoryController.getAllCategoryWithoutPopulate
);

/**
 * @swagger
 *  /admin/category/{id}:
 *    get:
 *        tags: ["Category(AdminPanel)"]
 *        summary: find category by object-id
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

router.get("/:id", AdminCategoryController.getCategoryById);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *    patch:
 *        tags: ["Category(AdminPanel)"]
 *        summary:  edit or update category title with object id
 *        parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *        requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *        responses:
 *           200:
 *               description: success
 *           500:
 *               description: InternalServerError
 *
 */

router.patch("/update/:id", AdminCategoryController.editCategoryTitle);

export const CategoryAdminApiRoutes = router;
