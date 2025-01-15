import AdminCategoryController from "@/http/controllers/admin/category/category.controller";
import { Router } from "express";

const router = Router();

router.post("/add", AdminCategoryController.addCategory);

router.get("/parents", AdminCategoryController.getAllParents);

router.get("/children/:parent", AdminCategoryController.getChildOfParents);

router.get("/all", AdminCategoryController.getAllCategory);

router.delete("/remove/:id", AdminCategoryController.remvoeCategory);

router.get("/list-of-all", AdminCategoryController.getAllCategoryWithoutPopulate);

router.get("/:id", AdminCategoryController.getCategoryById);

router.patch("/update/:id", AdminCategoryController.editCategoryTitle);

export const CategoryAdminApiRoutes = router;
