const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product");
const {
  deleteFileInPublic,
  ListOfImagesFromRequest,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { ObjectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const path = require("path");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      // ---------- for single Upload file
      // req.body.image = path.join(
      // productBody.fileUploadPath,
      // productBody.filename
      // );
      // const image = req.body.image.replace(/\\/g, "/");
      // ---------- end of single Upload file

      const images = ListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const productBody = await createProductSchema.validateAsync(req.body);
      const {
        title,
        text,
        short_text,
        category,
        tegs,
        count,
        price,
        discount,
        width,
        height,
        weight,
        length,
        colors,
        type,
      } = productBody;
      const supplier = req.user._id;
      let feture = {};
      feture.colors = colors;
      if (
        !isNaN(+width) ||
        !isNaN(+height) ||
        !isNaN(+weight) ||
        !isNaN(+length)
      ) {
        if (!width) feture.width = 0;
        else feture.width = +width;
        if (!height) feture.height = 0;
        else feture.height = +height;
        if (!weight) feture.weight = 0;
        else feture.weight = +weight;
        if (!length) feture.length = 0;
        else feture.length = +length;
      }
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
        feture,
        supplier,
        type,
      });
      return res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          message: "ثبت محصول با موفقیت افزوده شد.",
          product,
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeProductResult = await ProductModel.deleteOne({
        _id: product._id,
      });
      if (removeProductResult.deletedCount == 0)
        throw createHttpError.InternalServerError("");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "حذف محصول با موفقیت انجام شد.",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const products = await ProductModel.find({});
      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          totalCount: products.length,
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("محصولی یافت نشد.");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
