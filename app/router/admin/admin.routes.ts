import { Router } from "express";
import { BlogAdminApiRoutes } from "./blog";
import { CategoryAdminApiRoutes } from "./category";
import { ProductAdminApiRoutes } from "./product";
import { CourseAdminApiRoutes } from "./course";
import { ChapterAdminApiRoutes } from "./chapter";
import { EpisodeAdminApiRoutes } from "./episode";
import { UserAdminApiRoutes } from "./user";
import { RoleAdminApiRoutes } from "./role";
import { PermissionAdminApiRoutes } from "./permission";
import { checkPermission } from "@/http/middlewares/permission.guard";
import { ConstantConfig } from "@/utils/constants";

const router = Router();

router.use("/category", checkPermission([ConstantConfig.PERMISSIONS.CONTENT_MANAGER]), CategoryAdminApiRoutes);
router.use("/blogs", checkPermission([ConstantConfig.PERMISSIONS.TEACHER]), BlogAdminApiRoutes);
router.use(
  "/products",
  checkPermission([ConstantConfig.PERMISSIONS.SUPPLIER, ConstantConfig.PERMISSIONS.CONTENT_MANAGER]),
  ProductAdminApiRoutes
);
router.use("/courses", checkPermission([ConstantConfig.PERMISSIONS.TEACHER]), CourseAdminApiRoutes);
router.use("/chapter", checkPermission([ConstantConfig.PERMISSIONS.TEACHER]), ChapterAdminApiRoutes);
router.use("/episode", checkPermission([ConstantConfig.PERMISSIONS.TEACHER]), EpisodeAdminApiRoutes);
router.use("/user", UserAdminApiRoutes);
router.use("/permission", checkPermission([ConstantConfig.PERMISSIONS.ADMIN]), PermissionAdminApiRoutes);
router.use("/role", checkPermission([ConstantConfig.PERMISSIONS.ADMIN]), RoleAdminApiRoutes);

export const AdminRoutes = router;
