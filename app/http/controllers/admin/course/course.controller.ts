import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { CourseModel, ICourse } from "@/models/course";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { CreateCourseSchema } from "@/http/validators/admin/course.schema";
import createHttpError from "http-errors";
import mongoose from "mongoose";

class CourseController extends Controller {
  async getListOfCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || "";
      const query = search ? { $text: { $search: search } } : {};
      const courses = await CourseModel.find(query)
        .populate([
          { path: "category", select: { children: 0, parent: 0 } },
          { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } },
        ])
        .sort({ _id: -1 });
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        totalCount: courses.length,
        data: {
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await CreateCourseSchema.validateAsync(req.body);
      const { fileUploadPath, filename } = req.body;
      if (!fileUploadPath || !filename) {
        throw new Error("File upload path or filename is missing");
      }
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, short_text, text, tags, category, price, discount, type } = req.body;
      const teacher = req.user?._id;
      if (Number(price) > 0 && type == "free") throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد");
      const course = await CourseModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        discount,
        image,
        time: "00:00:00",
        status: "notStarted",
        teacher,
        type,
      });
      if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نگردید.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "دوره با موفقیت ایجاد شد.",
        },
      });
    } catch (error) {
      console.error("Error in addCourse:", error);
      next(error);
    }
  }
  async getCourseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const course = await CourseModel.find({ _id: id });
      if (!course) throw createHttpError.NotFound("دوره ای یافت نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: { course },
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id: string): Promise<ICourse> {
    if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه مورد نظر صحیح نمیباشد.");
    const course = await CourseModel.findById({ _id: id });
    if (!course) throw createHttpError.NotFound("دوره ای یافت نشد.");
    return course;
  }
}

export const AdminCourseController = new CourseController();
export default AdminCourseController;
