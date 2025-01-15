import { homeController } from "@/http/controllers/api/Home.controller";
import { verifyAccessToken } from "@/http/middlewares/verifyAccessToken";

import { Router } from "express";

const router = Router();


router.get("/", verifyAccessToken, homeController.indexPage);

export const HomeRoutes = router;
