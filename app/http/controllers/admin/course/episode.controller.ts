import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { CreateEpisodeSchema } from "@/http/validators/admin/course.schema";
import path from "path";
import { deleteInvalidPropertyInObject, getTime } from "@/utils/functions";
import { getVideoDurationInSeconds } from "get-video-duration";
import { CourseModel } from "@/models/course";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ObjectIdValidator } from "@/http/validators/public.validator";

class EpisodeController extends Controller {
  async addNewEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, text, type, chapterID, courseID, filename, fileUploadPath } = await CreateEpisodeSchema.validateAsync(
        req.body
      );
      const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      if (!process.env.BASE_URL || !process.env.APPLICATION_PORT) {
        throw new Error("Environment variables BASE_URL or APPLICATION_PORT are not set");
      }
      const baseURL = new URL(process.env.BASE_URL);
      baseURL.port = process.env.APPLICATION_PORT;
      const videoURL = new URL(videoAddress, baseURL).toString();
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };
      const createEpisodeResult = await CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError("افزودن اپیزود با خطا مواجه شد.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "افزودن اپیزود با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: episodeID } = await ObjectIdValidator.validateAsync({ id: req.params.episodeID });
      const { filename, fileUploadPath } = req.body;
      let blackListFields = ["_id"];
      if (filename && fileUploadPath) {
        const fileAddress = path.join(fileUploadPath, filename);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        if (!process.env.BASE_URL || !process.env.APPLICATION_PORT) {
          throw new Error("Environment variables BASE_URL or APPLICATION_PORT are not set");
        }
        const baseURL = new URL(process.env.BASE_URL);
        baseURL.port = process.env.APPLICATION_PORT;
        const videoURL = new URL(req.body.videoAddress, baseURL).toString();
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }
      const data = req.body;
      deleteInvalidPropertyInObject(data, blackListFields);
      const editEpisodeResult = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeID },
        {
          $set: {
            "chapters.$.episodes": data,
          },
        }
      );
      if (editEpisodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError("ویرایش اپیزود با خطا مواجه شد.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "ویرایش اپیزود با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: episodeID } = await ObjectIdValidator.validateAsync({ id: req.params.episodeID });
      const removeEpisodeResult = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeID },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeID,
            },
          },
        }
      );
      if (removeEpisodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف اپیزود با خطا مواجه شد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف اپیزود با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const AdminEpisodeController = new EpisodeController();

export default AdminEpisodeController;
