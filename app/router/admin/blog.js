const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header
 *                  example: Bearer <Token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjUwODI1NSIsImlhdCI6MTczNDUxNTEyMiwiZXhwIjoxNzM0NTIyMzIyfQ.QGejYiOfqy6O8w8-QU6psXN7gTIZsqbITTN0e17w6p8
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                 description: success - get array of blogs
 */

router.get("/", AdminBlogController.getListOfBlogs);

/**
 * @swagger
 * /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: Create a blog
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer <Token>
 *                  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjUwODI1NSIsImlhdCI6MTczNDUxNTEyMiwiZXhwIjoxNzM0NTIyMzIyfQ.QGejYiOfqy6O8w8-QU6psXN7gTIZsqbITTN0e17w6p8
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: Created successfully!
 *              400:
 *                  description: Bad Request - Invalid input.
 *              500:
 *                  description: Internal Server Error.
 */

router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.createBlog
);

/**
 * @swagger
 * /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: Update a blog by id
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer <Token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjUwODI1NSIsImlhdCI6MTczNDUxNTEyMiwiZXhwIjoxNzM0NTIyMzIyfQ.QGejYiOfqy6O8w8-QU6psXN7gTIZsqbITTN0e17w6p8
 *                  name: access-token
 *                  type: string
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              201:
 *                  description: Created successfully!
 *              400:
 *                  description: Bad Request - Invalid input.
 *              500:
 *                  description: Internal Server Error.
 */

router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminBlogController.updateBlogById
);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *       get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get blog by ID and populate this field
 *          parameters:
 *              -   in: header
 *                  example: Bearer <Token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjUwODI1NSIsImlhdCI6MTczNDUxNTEyMiwiZXhwIjoxNzM0NTIyMzIyfQ.QGejYiOfqy6O8w8-QU6psXN7gTIZsqbITTN0e17w6p8
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */

router.get("/:id", AdminBlogController.getOneBlogById);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *       delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: remove blog by ID
 *          parameters:
 *              -   in: header
 *                  example: Bearer <Token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjUwODI1NSIsImlhdCI6MTczNDUxNTEyMiwiZXhwIjoxNzM0NTIyMzIyfQ.QGejYiOfqy6O8w8-QU6psXN7gTIZsqbITTN0e17w6p8
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */

router.delete("/:id", AdminBlogController.deleteBlogById);

module.exports = {
  BlogAdminApiRoutes: router,
};
