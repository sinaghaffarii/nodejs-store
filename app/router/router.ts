import { Router } from "express";
import { AdminRoutes } from "./admin/admin.routes";
import { HomeRoutes } from "./api";
import { DeveloperRoutes } from "./developer.routes";
import { UserAuthRoutes } from "./user/auth";
import { verifyAccessToken } from "@/http/middlewares/verifyAccessToken";
import { graphqlHTTP } from "express-graphql";
import { graphqlConfig } from "@/utils/graphql.config";

const router = Router();

router.use("/user", UserAuthRoutes);
router.use("/admin", verifyAccessToken, AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", HomeRoutes);

export const AllRoutes = router;
