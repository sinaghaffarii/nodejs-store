import AdminRoleController from "@/http/controllers/admin/RBAC/role.controller";
import { stringToArray } from "@/http/middlewares/stringToArray";
import { Router } from "express";

const router = Router();

router.get("/list", AdminRoleController.getAllRoles);
router.post("/add", stringToArray("permissions"), AdminRoleController.createNewRole);
router.delete("/remove/:field", AdminRoleController.removeRole);
router.patch("/update/:id", stringToArray("permissions"), AdminRoleController.updateRoleById);
export const RoleAdminApiRoutes = router;
