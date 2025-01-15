import AdminProductController from "@/http/controllers/admin/product.controller";
import { stringToArray } from "../../http/middlewares/stringToArray";
import { uploadFile } from "../../utils/multer";
import { Router } from "express";

const router = Router();

// uploadFile.single("image"),
// دومین پارامتر مربوط به حداکثر تعداد عکس ها میباشد
router.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("colors"),
  AdminProductController.addProduct
);

router.get("/list", AdminProductController.getAllProduct);

router.get("/:id", AdminProductController.getOneProduct);

router.delete("/remove/:id", AdminProductController.removeProduct);

router.patch(
  "/edit/:id",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("colors"),
  AdminProductController.editProduct
);

export const ProductAdminApiRoutes = router;

// *                  image:
// *                       type: file
// *                       description: the title of product
