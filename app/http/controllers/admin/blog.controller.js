const { BlogModel } = require("../../../models/blog");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("./../controller");
const path = require("path");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");

      const { title, text, short_text, category, tegs } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        category,
        tegs,
        image,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "ایجاد بلاگ با موفقیت انجام شد.",
          result: { blog },
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author", // برای تبدیل آرایه کاربران به آبجکت
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(200).json({
        statusCode: 200,
        data: {
          blogs,
          totalCount: blogs.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
