import createHttpError from "http-errors";
import { ProductModel } from "../../../../models/product";
import {
  copyObject,
  deleteFileInPublic,
  deleteInvalidPropertyInObject,
  ListOfImagesFromRequest,
  setFeatures,
} from "../../../../utils/functions";
import { CreateProductSchema } from "@/http/validators/admin/product.schema";
import { ObjectIdValidator } from "@/http/validators/public.validator";
import Controller from "../../controller";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IProduct } from "../../../../models/product";
import { ProductBlackList } from "@/utils/enums";

class ProductController extends Controller {
  async addProduct(req: Request<{}, {}, IProduct>, res: Response, next: NextFunction): Promise<void> {
    try {
      // ---------- for single Upload file
      // req.body.image = path.join(
      // productBody.fileUploadPath,
      // productBody.filename
      // );
      // const image = req.body.image.replace(/\\/g, "/");
      // ---------- end of single Upload file

      const images = ListOfImagesFromRequest(Array.isArray(req.files) ? req.files : [], req.body.fileUploadPath);
      const productBody = await CreateProductSchema.validateAsync(req.body);
      const { title, text, short_text, category, tegs, count, price, discount, type } = productBody;
      const supplier = req.user?._id;
      let feature = setFeatures(req.body);
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tegs,
        count,
        price,
        discount,
        images,
        feature,
        supplier,
        type,
      });
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "ثبت محصول با موفقیت افزوده شد.",
        data: {
          product,
        },
      });
    } catch (error) {
      if (req.body.images) {
        req.body.images.forEach((image: string) => deleteFileInPublic(image));
      }
      next(error);
    }
  }
  async editProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const data = copyObject(req.body);
      data.images = ListOfImagesFromRequest(Array.isArray(req.files) ? req.files : [], req.body.fileUploadPath);
      data.feature = setFeatures(req.body);
      let blackListFields = Object.values(ProductBlackList) as string[];
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateProductResult = await ProductModel.updateOne({ _id: product._id }, { $set: data });
      if (updateProductResult.modifiedCount == 0)
        throw {
          status: createHttpError.InternalServerError,
          message: "خطای داخلی",
        };
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: { message: "به روز رسانی با موفقیت انجام شد." },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeProductResult = await ProductModel.deleteOne({
        _id: product._id,
      });
      if (removeProductResult.deletedCount == 0) throw createHttpError.InternalServerError("");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف محصول با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || "";
      const query = search ? { $text: { $search: search } } : {};
      const products = await ProductModel.find(query);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        totalCount: products.length,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productID: string) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findOne({ _id: id }).populate([{ path: "category", select: ["title"] }]);
    if (!product) throw createHttpError.NotFound("محصولی یافت نشد.");
    return product;
  }
}

export const AdminProductController = new ProductController();

export default AdminProductController;
