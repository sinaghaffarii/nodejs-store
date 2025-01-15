import { Router } from "express";
import { uploadFile } from "@/utils/multer";
import { stringToArray } from "@/http/middlewares/stringToArray";
import AdminBlogController from "@/http/controllers/admin/blog/blog.controller";

const router = Router();

router.get("/", AdminBlogController.getListOfBlogs);

router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);

router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlogById);

router.get("/:id", AdminBlogController.getOneBlogById);

router.delete("/:id", AdminBlogController.deleteBlogById);

export const BlogAdminApiRoutes = router;
