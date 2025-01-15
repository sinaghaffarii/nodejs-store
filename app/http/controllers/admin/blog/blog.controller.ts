import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { BlogModel } from "../../../../models/blog";
import { deleteFileInPublic } from "../../../../utils/functions";
import CreateBlogSchema from "@/http/validators/admin/blog.schema";
import Controller from "./../../controller";
import path from "path";
import { StatusCodes } from "http-status-codes";

const { ObjectId } = mongoose.Types;

class BlogController extends Controller {
  async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogDataBody = await CreateBlogSchema.validateAsync(req.body);
      req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
      req.body.image = req.body.image.replace(/\\/g, "/");

      const { title, text, short_text, category, tegs } = blogDataBody;
      const image = req.body.image;
      const author = req.user?._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        category,
        tegs,
        image,
        author,
      });
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "ایجاد بلاگ با موفقیت انجام شد.",
          blog,
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        totalCount: blogs.length,
        data: {
          blogs,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async getCommentsOfBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });
      const result = await BlogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0) throw createHttpError.InternalServerError("حذف انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.findBlog({ _id: id });

      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackListFields = ["comments", "likes", "dislikes", "bookmarks", "author"];
      Object.keys(data).forEach((key) => {
        if (blackListFields.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });

      // Convert category to ObjectId if it's a string

      if (data.category && typeof data.category === "string") {
        data.category = new ObjectId(data.category);
      }

      const updateResult = await BlogModel.updateOne({ _id: id }, { $set: data });

      if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروز رسانی انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
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
    // delete blog.category.children; // This line is removed because 'children' does not exist on 'category'
    return blog;
  }
}

export const AdminBlogController = new BlogController();
export default AdminBlogController;
