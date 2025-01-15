/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                    type: string
 *                    description: the title of category
 *                  short_text:
 *                    type: string
 *                    description: the summary of text of blog
 *                  text:
 *                    type: string
 *                    description: the text of blog
 *                  tags:
 *                    type: string
 *                    description: the list of tags for example = tag1#tag2#tag3_foo#foo_bar
 *                  category:
 *                    type: string
 *                    description: the id of category for foreign field in blog
 *                  image:
 *                    type: string
 *                    format: binary
 *                    description: the index picture of blog
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                    type: string
 *                    description: the title of category
 *                  text:
 *                    type: string
 *                    description: the summary of text of blog
 *                  short_text:
 *                    type: string
 *                    description: the text of blog
 *                  tags:
 *                    type: string
 *                    description: the list of tags for example = tag1#tag2#tag3_foo#foo_bar
 *                  category:
 *                    type: string
 *                    description: the id of category for foreign field in blog
 *                  image:
 *                    type: string
 *                    format: binary
 *                    description: the index picture of blog
 */

/**
 * @swagger
 * /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                 description: success - get array of blogs
 */

/**
 * @swagger
 * /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: Create a blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: Created successfully!
 *              400:
 *                  description: Bad Request - Invalid input.
 *              500:
 *                  description: Internal Server Error.
 */

/**
 * @swagger
 * /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: Update a blog by id
 *          parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *          responses:
 *              201:
 *                  description: Created successfully!
 *              400:
 *                  description: Bad Request - Invalid input.
 *              500:
 *                  description: Internal Server Error.
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *       get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get blog by ID and populate this field
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *       delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: remove blog by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
