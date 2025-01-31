
/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  description: HTTP status code of the response
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          description: List of roles
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: Unique identifier for the role
 *                                      example: "674cc5539c3d09db70a185f8"
 *                                  title:
 *                                      type: string
 *                                      description: Title of the role
 *                                      example: "title of role"
 *                                  permissions:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                               _id:
 *                                                   type: string
 *                                                   description: Unique identifier for the role
 *                                                   example: "674cc5539c3d09db70a185f8"
 *                                               title:
 *                                                   type: string
 *                                                   description: Title of the role
 *                                                   example: "title of role"
 *                                               description:
 *                                                   type: string
 *                                                   example: "describe the permission"
 *
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                    type: string
 *                    description: the title of role
 *                  permissions:
 *                    type: array
 *                    description: the permissionsID for role 
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                    type: string
 *                    description: the title of role
 *                  permissions:
 *                    type: array
 *                    description: the permissionsID for role
 */

/**
 * @swagger
 *   /admin/role/list:
 *     get:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Get List Of Roles
 *       responses:
 *         201:
 *          description: Created successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *   /admin/role/add:
 *     post:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Create New Role
 *       requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/Role'
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
 *   /admin/role/update/{id}:
 *     patch:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: Update New Role
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
 *                $ref: '#/components/schemas/Edit-Role'
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
 *   /admin/role/remove/{field}:
 *     delete:
 *       tags:
 *         - RBAC(AdminPanel)
 *       summary: remove the Role
 *       parameters:
 *          -   in: path
 *              name: field
 *              type: string
 *              required: true
 *              description: Send title of role or objectID of role for remove that
 *       responses:
 *         200:
 *          description: Removed successfully!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:  '#/definitions/publicDefinition'
 */