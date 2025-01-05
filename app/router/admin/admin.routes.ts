// import { verifyAccessToken } from "../../http/middlewares/verifyAccessToken";
import { Router } from "express";
import { BlogAdminApiRoutes } from "./blog";
import { CategoryAdminApiRoutes } from "./category";
import { ProductAdminApiRoutes } from "./product";

const router = Router();

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

export const AdminRoutes = router;
