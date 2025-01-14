import { NextFunction, Request, Response } from "express";
import Controller from "../controller";
import { CourseModel, ICourse } from "@/models/course";
import { StatusCodes } from "http-status-codes";
import path from "path";

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
      const { fileUploadPath, filename } = req.body;
      if (!fileUploadPath || !filename) {
        throw new Error("File upload path or filename is missing");
      }
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, short_text, text, tags, category, price, discount } = req.body;
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          title,
          short_text,
          text,
          tags,
          category,
          price,
          discount,
          image,
        },
      });
    } catch (error) {
      console.error("Error in addCourse:", error);
      next(error);
    }
  }
}

export const AdminCourseController = new CourseController();

export default AdminCourseController;
