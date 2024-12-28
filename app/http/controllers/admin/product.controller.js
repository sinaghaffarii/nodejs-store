const { ProductModel } = require("../../../models/product");
const {
  deleteFileInPublic,
  ListOfImagesFromRequest,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = ListOfImagesFromRequest(
        req?.files,
        req.body.fileUploadPath
      );

      const productBody = await createProductSchema.validateAsync(req.body);

      // ---------- for single Upload file
      // req.body.image = path.join(
      // productBody.fileUploadPath,
      // productBody.filename
      // );
      // const image = req.body.image.replace(/\\/g, "/");
      // ---------- end of single Upload file

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
      } = productBody;
      const supplier = req.user._id;
      let feature = {},
        type = "physical";
      if (width || height || weight || length) {
        if (!width) feature.width = 0;
        else feature.width = width;
        if (!height) feature.height = 0;
        else feature.height = height;
        if (!weight) feature.weight = 0;
        else feature.weight = weight;
        if (!length) feature.length = 0;
        else feature.length = length;
      } else {
        type = "virtual";
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
        feature,
        supplier,
        type,
      });
      return res.json({
        data: {
          statusCode: 201,
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
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const products = await ProductModel.find({});
      return res.status(200).json({
        data: {
          statusCode: 200,
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
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};
