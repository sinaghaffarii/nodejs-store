import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { UserModel } from "@/models/user";
import { StatusCodes } from "http-status-codes";
import { deleteInvalidPropertyInObject } from "@/utils/functions";
import createHttpError from "http-errors";

class UserController extends Controller {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const search = (req.query.search as string) || "";
      const query = search ? { $text: { $search: search } } : {};
      const users = await UserModel.find(query);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user?._id;
      const data = req.body;
      const blackListFields = ["mobile", "otp", "bills", "discount", "roles", "courses"];
      deleteInvalidPropertyInObject(data, blackListFields);
      const profileUpdateResult = await UserModel.updateOne(
        { _id: userID },
        {
          $set: data,
        }
      );
      if (!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("بروز رسانی انجام نشد.");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "بروز رسانی پروفایل با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      //bill, courses, discount
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const AdminUserController = new UserController();

export default AdminUserController;
