// import { verifyAccessToken } from "../../http/middlewares/verifyAccessToken";
import { Router } from "express";
import { BlogAdminApiRoutes } from "./blog";
import { CategoryAdminApiRoutes } from "./category";
import { ProductAdminApiRoutes } from "./product";
import { CourseAdminApiRoutes } from "./course";
import { ChapterAdminApiRoutes } from "./chapter";

const router = Router();

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);
router.use("/courses", CourseAdminApiRoutes);
router.use("/chapter", ChapterAdminApiRoutes);

export const AdminRoutes = router;
