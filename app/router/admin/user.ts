import AdminUserController from "@/http/controllers/admin/user/user.controller";
import { Router } from "express";


const router = Router();


router.get("/list" , AdminUserController.getAllUsers)
router.patch("/update-profile", AdminUserController.updateUserProfile)

export const UserAdminApiRoutes = router;
