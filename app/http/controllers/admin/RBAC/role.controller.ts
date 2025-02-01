import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { RoleModel } from "@/models/role";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { AddRoleSchema } from "@/http/validators/admin/RBAC.schema";
import mongoose from "mongoose";
import { copyObject, deleteInvalidPropertyInObject } from "@/utils/functions";

class RoleController extends Controller {
  async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await RoleModel.find({});
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createNewRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, permissions } = await AddRoleSchema.validateAsync(req.body);
      await this.findRoleWithTitle(title);
      const role = await RoleModel.create({
        title,
        permissions,
      });
      if (!role) throw createHttpError.InternalServerError("ایجاد نقش با خطا مواجه شد.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "نقش با موفقیت ایجاد شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { field } = req.params;
      const role = await this.findRoleWidthIdOrTitle(field);
      const removeRoleResult = await RoleModel.deleteOne({ _id: role._id });
      if (!removeRoleResult.deletedCount) throw new createHttpError.InternalServerError("حذف نقش انجام نشد!");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف نقش با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const role = await this.findRoleWidthIdOrTitle(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updateRoleResult = await RoleModel.updateOne(
        { _id: role._id },
        {
          $set: data,
        }
      );
      if (!updateRoleResult.modifiedCount) throw new createHttpError.InternalServerError("ویرایش نقش انجام نشد!");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "ویرایش نقش با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findRoleWithTitle(title: string) {
    const role = await RoleModel.findOne({ title });
    if (role) throw new createHttpError.BadRequest("نقش قبلا ثبت شده.");
  }
  async findRoleWidthIdOrTitle(field: string) {
    let findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
    const role = await RoleModel.findOne(findQuery);
    if (!role) throw new createHttpError.NotFound("نقش مورد نظر یافت نشد");
    return role;
  }
}

const AdminRoleController = new RoleController();
export default AdminRoleController;
