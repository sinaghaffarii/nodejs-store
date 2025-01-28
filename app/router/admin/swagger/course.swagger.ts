/**
 * @swagger
 *   components:
 *     schemas:
 *       Types:
 *         type: string
 *         enum:
 *           - free
 *           - cash
 *           - special
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  description: HTTP status code of the response
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          description: List of courses
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: Unique identifier for the course
 *                                      example: "674cc5539c3d09db70a185f8"
 *                                  title:
 *                                      type: string
 *                                      description: Title of the course
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      description: Summary text of the course
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      description: Detailed description of the course
 *                                      example: "text and description of course"
 *                                  status:
 *                                      type: string
 *                                      description: Current status of the course
 *                                      example: "notStarted | Completed | Holding of course"
 *                                  time:
 *                                      type: string
 *                                      description: Duration of the course
 *                                      example: "01:24:32"
 *                                  price:
 *                                      type: integer
 *                                      description: Price of the course
 *                                      example: 250000
 *                                  discount:
 *                                      type: integer
 *                                      description: Discount on the course price
 *                                      example: 20
 *                                  studentCount:
 *                                      type: integer
 *                                      description: Number of students enrolled in the course
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      description: Name of the course teacher
 *                                      example: "Sina Ghaffari"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        Insert-Course:
 *          type: object
 *          required:
 *            - title
 *            - short_text
 *            - text
 *            - tags
 *            - category
 *            - price
 *            - discount
 *            - image
 *            - type
 *            - teacher
 *          properties:
 *            title:
 *              type: string
 *              description: The title of the course
 *              example: "Introduction to Programming"
 *            short_text:
 *              type: string
 *              description: A short summary of the course
 *              example: "Learn the basics of programming."
 *            text:
 *              type: string
 *              description: Detailed description of the course
 *              example: "This course covers the fundamentals of programming..."
 *            tags:
 *              type: array
 *              description: Tags associated with the course
 *              items:
 *                type: string
 *              example: ["programming", "basics", "introduction"]
 *            category:
 *              type: string
 *              description: The category of the course
 *              example: "Computer Science"
 *            price:
 *              type: integer
 *              description: The price of the course
 *              example: 100000
 *            discount:
 *              type: integer
 *              description: The discount on the course price
 *              example: 20
 *            image:
 *              type: string
 *              format: binary
 *              description: The image to upload
 *            teacher:
 *              type: string
 *              description: The teacher of the course
 *              example: "Sina Ghaffari"
 *            type:
 *              $ref: '#/components/schemas/Types'
 *        Edit-Course:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              description: The title of the course
 *            short_text:
 *              type: string
 *              description: A short summary of the course
 *            text:
 *              type: string
 *              description: Detailed description of the course
 *            tags:
 *              type: array
 *              description: Tags associated with the course
 *              items:
 *                type: string
 *            category:
 *              type: string
 *              description: The category of the course
 *            price:
 *              type: integer
 *              description: The price of the course
 *            discount:
 *              type: integer
 *              description: The discount on the course price
 *            image:
 *              type: string
 *              format: binary
 *              description: The image to upload
 *            teacher:
 *              type: string
 *              description: The teacher of the course
 *            type:
 *              $ref: '#/components/schemas/Types'
 */

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course text, title, short_text
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get one of course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *   /admin/courses/add:
 *     post:
 *       tags:
 *         - Course(AdminPanel)
 *       summary: Create and save Course
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *                $ref: '#/components/schemas/Insert-Course'
 *       responses:
 *         201:
 *           description: Created successfully!
 *         400:
 *           description: Bad Request - Invalid input.
 *         500:
 *           description: Internal Server Error.
 */

/**
 * @swagger
 *   /admin/courses/update/{id}:
 *     patch:
 *       tags:
 *         - Course(AdminPanel)
 *       summary: Edit and save Course
 *       parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *                $ref: '#/components/schemas/Edit-Course'
 *       responses:
 *         201:
 *           description: Created successfully!
 *         400:
 *           description: Bad Request - Invalid input.
 *         500:
 *           description: Internal Server Error.
 */
