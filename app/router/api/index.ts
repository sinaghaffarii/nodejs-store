import { homeController } from "@/http/controllers/api/Home.controller";
import { verifyAccessToken } from "@/http/middlewares/verifyAccessToken";

import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: apis for index page
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      parameters:
 *          - in : header
 *            name: access-token
 *            example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Not Found
 */

router.get("/", verifyAccessToken, homeController.indexPage);

export const HomeRoutes = router;
