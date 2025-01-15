import { UserAuthenticationController } from "@/http/controllers/user/auth/auth.controller";

import { Router } from "express";

const router = Router();

router.post("/get-otp", UserAuthenticationController.getOtp);

router.post("/check-otp", UserAuthenticationController.checkOtp);

router.post("/refresh-token", UserAuthenticationController.refreshToken);

export const UserAuthRoutes = router;
