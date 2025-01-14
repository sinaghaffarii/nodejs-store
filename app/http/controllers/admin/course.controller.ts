import { NextFunction, Request, Response } from "express";
import Controller from "../controller";
import { CourseModel, ICourse } from "@/models/course";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { CreateCourseSchema } from "@/http/validators/admin/course.schema";
import createHttpError from "http-errors";

class CourseController extends Controller {
  async getListOfCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || "";
      const query = search ? { $text: { $search: search } } : {};
      const courses = await CourseModel.find(query).sort({ _id: -1 });
      res.status(StatusCodes.OK).json({
        data: {
          statusCode: StatusCodes.OK,
          totalCount: courses.length,
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
        message: "دوره با موفقیت ایجاد شد.",
      });
    } catch (error) {
      console.error("Error in addCourse:", error);
      next(error);
    }
  }
}

export const AdminCourseController = new CourseController();

export default AdminCourseController;
