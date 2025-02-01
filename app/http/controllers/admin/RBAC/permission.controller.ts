import { NextFunction, Request, Response } from "express";
import Controller from "../../controller";
import { PermissionsModel } from "@/models/permission";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { AddPermissionSchema } from "@/http/validators/admin/RBAC.schema";
import { copyObject, deleteInvalidPropertyInObject } from "@/utils/functions";

class PermissionController extends Controller {
  async getAllPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissions = await PermissionsModel.find({});
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createNewPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = await AddPermissionSchema.validateAsync(req.body);
      await this.findPermissionWithName(name);

      const permission = await PermissionsModel.create({
        name,
        description,
      });

      if (!permission) throw createHttpError.InternalServerError("ایجاد سطح دسترسی با خطا مواجه شد.");
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "سطح دسترسی با موفقیت ایجاد شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removePermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.findPermissionWithID(id);
      const permissionRemoveResult = await PermissionsModel.deleteOne({ _id: id });
      if (!permissionRemoveResult.deletedCount) throw new createHttpError.InternalServerError("حذف سطح دسترسی با خطا مواجه شد!");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "حذف سطح دسترسی با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updatePermissionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.findPermissionWithID(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, []);
      const updatePermissionResult = await PermissionsModel.updateOne(
        { _id: id },
        {
          $set: data,
        }
      );
      if (!updatePermissionResult.modifiedCount) throw new createHttpError.InternalServerError("ویرایش سطح دسترسی انجام نشد!");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "ویرایش سطح دسترسی با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findPermissionWithName(name: string) {
    const permission = await PermissionsModel.findOne({ name });
    if (permission) throw new createHttpError.Conflict("این دسترسی از قبل در سامانه وجود دارد.");
  }
  async findPermissionWithID(permissionID: string) {
    const permission = await PermissionsModel.findOne({ _id: permissionID });
    if (!permission) throw new createHttpError.NotFound("سطح دسترسی یافت نشد!");
    return permission;
  }
}

const AdminPermissionController = new PermissionController();
export default AdminPermissionController;
