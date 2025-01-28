/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                  username:
 *                      type: string
 *                      description: the username of user
 *                  email:
 *                      type: string
 *                      description: the email of user
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                   _id:
 *                                       type: string
 *                                       example:  "674cc5539c3d09db7655158741"
 *                                   first_name:
 *                                       type: string
 *                                       example:  "user first_name"
 *                                   last_name:
 *                                       type: string
 *                                       example:  "user last_name"
 *                                   username:
 *                                       type: string
 *                                       example:  "username"
 *                                   email:
 *                                       type: string
 *                                       example:  "the_user_email@gmail.com"
 *                                   mobile:
 *                                       type: string
 *                                       example:  "09912508255"
 */

/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [User(AdminPanel)]
 *          summary: get all of users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile, email
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 * /admin/user/update-profile:
 *      patch:
 *          tags: [User(AdminPanel)]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Update-Profile"              
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Update-Profile"
 *          response:
 *              200:
 *                  description: success
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'           
 */
