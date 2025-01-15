import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { CourseModel } from "@/models/course";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import AdminCourseController from "./course.controller";
import { deleteInvalidPropertyInObject } from "@/utils/functions";

class ChapterController extends Controller {
  async addChapter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, title, text } = req.body;
      await AdminCourseController.findCourseById(id);
      const saveChapterResult = await CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );
      if (saveChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "فصل با موفقیت ایجاد شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async chaptersOfCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { courseID } = req.params;
      const course = await this.getChaptersOfCourse(courseID);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeChapterById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chapterID } = req.params;
      const chapter = await this.getOneChapter(chapterID);
      const removeChapterResult = await CourseModel.updateOne(
        { "chapters._id": chapterID },
        {
          $pull: {
            chapters: {
              _id: chapterID,
            },
          },
        }
      );
      if (removeChapterResult.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف فصل انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف فصل با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateChapterById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chapterID } = req.params;
      await this.getOneChapter(chapterID);
      const data = req.body;
      deleteInvalidPropertyInObject(data, ["_id"]);
      const updateChapterResult = await CourseModel.updateOne(
        {
          "chapters._id": chapterID,
        },
        {
          $set: {
            "chapters.$": data,
          },
        }
      );
      if (updateChapterResult.modifiedCount == 0) throw new createHttpError.InternalServerError("بروز رسانی فصل انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "بروز رسانی با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChaptersOfCourse(id: string) {
    const chapters = await CourseModel.findOne({ _id: id }, { chapters: 1, title: 1 });
    if (!chapters) throw createHttpError.NotFound("دوره ای به این شناسه یافت نشد.");
    return chapters;
  }
  async getOneChapter(id: string) {
    const chapter = await CourseModel.findOne({ "chapters._id": id }, { "chapters.$": 1 });
    if (!chapter) throw new createHttpError.NotFound("فصلی با این شناسه یافت نشد.");
    return chapter;
  }
}

export const AdminChapterController = new ChapterController();

export default AdminChapterController;
