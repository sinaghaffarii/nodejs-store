
/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  description: HTTP status code of the response
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          description: List of permission
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: Unique identifier for the permission
 *                                      example: "674cc5539c3d09db70a185f8"
 *                                  name:
 *                                    type: string
 *                                    description: name of permission
 *                                  description:
 *                                    type: string
 *                                    description: describe of permission
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                    type: string
 *                    description: the name of permission
 *                  description:
 *                    type: string
 *                    description: the describe of permission
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                    description: the name of permission
 *                  description:
 *                    type: string
 *                    description: the describe of permission
 */

/**
 * @swagger
 *   /admin/permission/list:
 *     get:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Get List Of Permissions 
 *       responses:
 *         201:
 *          description: Created successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *   /admin/permission/add:
 *     post:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Create New Permission
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/Permission'
 *       responses:
 *         201:
 *          description: Created successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *   /admin/permission/update/{id}:
 *     patch:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Update New Permission
 *       parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/Edit-Permission'
 *       responses:
 *         200:
 *          description: Update successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *   /admin/permission/remove/{id}:
 *     delete:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Remove The Permission
 *       parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *       responses:
 *         200:
 *          description: Removed successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/publicDefinition'
 */