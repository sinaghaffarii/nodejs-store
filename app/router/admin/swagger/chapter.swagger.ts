/**
 * @swagger
 *  definitions:
 *      chapterOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              course:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                          example:  "674cc5539c3d09db7655158741"
 *                                      title:
 *                                          type: string
 *                                          example:  title of course
 *                                      chapters:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                          example: [{_id: "674cc5539c3d09db70a185f8", title: "title of course" , text: "text text"}]
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        AddChapter:
 *          type: object
 *          required:
 *              -   id
 *              -   title
 *          properties:
 *              id:
 *                type: string
 *                example: "674cc5539c3d09db70a185f8"
 *              title:
 *                type: string
 *                example: chapter 1 zero - hero javascript
 *              text:
 *                type: string
 *                example: the describe about this chapter
 *        EditChapter:
 *          type: object
 *          properties:
 *              title:
 *                type: string
 *                example: chapter 1 zero - hero javascript
 *              text:
 *                type: string
 *                example: the describe about this chapter
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/AddChapter'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter for courses
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/definitions/chapterOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove chapter from courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/update/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: update chapter from courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:  '#/definitions/publicDefinition'
 */

