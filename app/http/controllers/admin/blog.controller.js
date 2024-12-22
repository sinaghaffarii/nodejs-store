const createHttpError = require("http-errors");
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
          blog,
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
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
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author", // برای تبدیل آرایه کاربران به آبجکت
            // preserveNullAndEmptyArrays: true,// در صورت عدم وجود نویسنده، بلاگ‌ها را حفظ کنید
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
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
            "author.roles": 0,
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
      console.error(error);
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
      const { id } = req.params;
      await this.findBlog({ _id: id });
      const result = await BlogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف انجام نشد.");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackListFields = [
        "comments",
        "likes",
        "deslikes",
        "bookmarks",
        "author",
      ];
      Object.keys(data).forEach((key) => {
        if (blackListFields.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
      const updateResult = await BlogModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("بروز رسانی انجام نشد.");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروز رسانی بلاگ با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findBlog(query = {}) {
    const blog = await BlogModel.findOne(query).populate([
      { path: "category", select: ["title"] },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) throw createHttpError.NotFound("مقاله ای یافت نشد");
    delete blog.category.children;
    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
