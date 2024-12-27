const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *     -  name: Admin-Panel
 *        description: action of admin (add, remove, edit and any do)
 *     -  name: Category(AdminPanel)
 *        description: all method and routes about category section
 *     -  name: Blog(AdminPanel)
 *        description: made blog management admin panel
 */

router.use("/category",verifyAccessToken, CategoryRoutes);

router.use("/blogs", verifyAccessToken , BlogAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
