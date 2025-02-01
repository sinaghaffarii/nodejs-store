import { IPermission, PermissionsModel } from "@/models/permission";
import { RoleModel } from "@/models/role";
import { ConstantConfig } from "@/utils/constants";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

interface User {
  _id: string;
  role: string;
}
export function checkPermission(requiredPermissions: string[][] = []) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // تمام مجوزهای لازم را به صورت یک آرایه‌ی تخت درمی‌آوریم
      const allPermissions = requiredPermissions.flat();
      // اطلاعات کاربر از درخواست
      const user = req.user as User;
      // پیدا کردن نقش کاربر
      const role = await RoleModel.findOne({ title: user.role });
      if (!role) {
        throw createHttpError.Forbidden("نقش کاربر یافت نشد");
      }
      // پیدا کردن مجوزهای مرتبط با نقش کاربر
      const permissions = await PermissionsModel.find({ _id: { $in: role.permissions } });
      const userPermissions = permissions.map((item) => item.name);
      // اگر کاربر مجوز "all" داشته باشد، اجازه دسترسی داده می‌شود
      if (userPermissions.includes(ConstantConfig.PERMISSIONS.ALL[0])) {
        return next();
      }
      // اگر هیچ مجوزی لازم نباشد، اجازه دسترسی داده می‌شود
      if (allPermissions.length === 0) {
        return next();
      }
      // بررسی می‌کند که آیا کاربر تمام مجوزهای لازم را دارد یا خیر
      const hasPermission = allPermissions.every((permission) => userPermissions.includes(permission));

      if (!hasPermission) {
        throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
