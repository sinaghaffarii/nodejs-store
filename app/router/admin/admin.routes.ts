import { Router } from "express";
import { BlogAdminApiRoutes } from "./blog";
import { CategoryAdminApiRoutes } from "./category";
import { ProductAdminApiRoutes } from "./product";
import { CourseAdminApiRoutes } from "./course";
import { ChapterAdminApiRoutes } from "./chapter";
import { EpisodeAdminApiRoutes } from "./episode";
import { UserAdminApiRoutes } from "./user";

const router = Router();

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);
router.use("/courses", CourseAdminApiRoutes);
router.use("/chapter", ChapterAdminApiRoutes);
router.use("/episode", EpisodeAdminApiRoutes);
router.use("/user", UserAdminApiRoutes);

export const AdminRoutes = router;
