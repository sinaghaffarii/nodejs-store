const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   images
 *                  -   type
 *                  -   colors
 *              properties:
 *                  title:
 *                       type: string
 *                       description: the title of product
 *                  short_text:
 *                       type: string
 *                       description: the title of product
 *                  text:
 *                       type: string
 *                       description: the title of product
 *                  tags:
 *                       type: array
 *                       description: the title of product
 *                  category:
 *                       type: string
 *                       description: the title of product
 *                  price:
 *                       type: string
 *                       description: the title of product
 *                  discount:
 *                       type: string
 *                       description: the title of product
 *                  count:
 *                       type: string
 *                       description: the title of product
 *                  images:
 *                        type: array
 *                        items:
 *                            type: file
 *                            collectionFormat: multi
 *                  height:
 *                       type: string
 *                       description: the height of product packet
 *                  weight:
 *                       type: string
 *                       description: the weight of product packet
 *                  width:
 *                       type: string
 *                       description: the width of product packet
 *                  length:
 *                       type: string
 *                       description: the length of product packet
 *                  type:
 *                       type: string
 *                       example: virtual or physics
 *                       description: the type of product
 *                  colors:
 *                        type: array
 *                        description: A list of colors selected for the product
 *                        items:
 *                            type: string
 *                            enum: [red, green, blue, yellow, purple]
 *                        example: ["red", "blue"]
 */

/**
 * @swagger
 *  /admin/products/add:
 *    post:
 *      tags:
 *        - Product(AdminPanel)
 *      summary: Create and save product
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        201:
 *          description: Created New Product
 */

// uploadFile.single("image"),
// دومین پارامتر مربوط به حداکثر تعداد عکس ها میباشد
router.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("colors"),
  ProductController.addProduct
);
/**
 * @swagger
 *  /admin/products/list:
 *    get:
 *      tags:
 *        - Product(AdminPanel)
 *      summary: Get All Products
 *      responses:
 *        200:
 *          description: Successfully
 */

router.get("/list", ProductController.getAllProduct);

/**
 * @swagger
 *    /admin/products/{id}:
 *      get:
 *        tags:
 *          - Product(AdminPanel)
 *        summary: Get One Products
 *        parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                description: object
 *        responses:
 *            200:
 *              description: success
 */

router.get("/:id", ProductController.getOneProduct);
/**
 * @swagger
 *    /admin/products/remove/{id}:
 *      delete:
 *        tags:
 *          - Product(AdminPanel)
 *        summary: Remove One Product
 *        parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                description: object
 *        responses:
 *            200:
 *              description: success
 */

router.delete("/remove/:id", ProductController.removeProduct);

// router.patch()
// router.delete()
// router.get()

module.exports = {
  ProductAdminApiRoutes: router,
};

// *                  image:
// *                       type: file
// *                       description: the title of product
