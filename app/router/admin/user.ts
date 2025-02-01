import AdminUserController from "@/http/controllers/admin/user/user.controller";
import { checkPermission } from "@/http/middlewares/permission.guard";
import { ConstantConfig } from "@/utils/constants";
import { Router } from "express";

const router = Router();

router.get("/list", checkPermission([ConstantConfig.PERMISSIONS.ADMIN]), AdminUserController.getAllUsers);
router.patch("/update-profile", AdminUserController.updateUserProfile);
router.get("/profile", checkPermission([]), AdminUserController.userProfile);

export const UserAdminApiRoutes = router;
