import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import createError from "http-errors";
import { ConstantConfig } from "@/utils/constants";
import { UserModel } from "../../models/user";
import createHttpError from "http-errors";

interface Headers {
  authorization?: string;
}

export function getToken(headers: Headers): string {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["bearer", "Bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized("حساب کاربری شناسایی نشد، لطفا وارد حساب کاربری خود شوید.");
}

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ConstantConfig.ACCESS_TOKEN_SECRET_KEY, async (error, payload) => {
      try {
        if (error) throw createError.Unauthorized("وارد حساب کاربری خود شوید");
        const { mobile } = (payload as JWT.JwtPayload) || {};
        const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد.");
        // req.user = user;
        req.user = {
          ...user.toObject(),
          _id: (user._id as string).toString(),
        };
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

interface User {
  _id: string;
  roles: string[];
}
export function checkRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      if (user && user.roles.includes(role)) return next();
      throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید.");
    } catch (error) {
      next(error);
    }
  };
}
