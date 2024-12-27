const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryAdminApiRoutes } = require("./category");
const { ProductAdminApiRoutes } = require("./product");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *     -  name: Admin-Panel
 *        description: action of admin (add, remove, edit and any do)
 *     -  name: Product(AdminPanel)
 *        description: management product routes
 *     -  name: Category(AdminPanel)
 *        description: all method and routes about category section
 *     -  name: Blog(AdminPanel)
 *        description: made blog management admin panel
 */

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
