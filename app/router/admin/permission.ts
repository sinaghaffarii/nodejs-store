import AdminPermissionController from "@/http/controllers/admin/RBAC/permission.controller";
import { Router } from "express";

const router = Router();

router.get("/list", AdminPermissionController.getAllPermissions);
router.post("/add", AdminPermissionController.createNewPermission);
router.delete("/remove/:id", AdminPermissionController.removePermission);
export const PermissionAdminApiRoutes = router;
