const { CategoryModel } = require("../../../models/category");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.internalServerError("خطای شبکه ");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async remvoeCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async editCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
