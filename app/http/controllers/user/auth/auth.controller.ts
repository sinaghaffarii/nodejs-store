import createError from "http-errors";
import { GetOtpSchema, CheckOtpSchema } from "@/http/validators/user/auth.schema";
import { RandomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } from "../../../../utils/functions";
import { UserModel } from "../../../../models/user";
import { ConstantConfig } from "@/utils/constants";
import Controller from "../../controller";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UserAuthController extends Controller {
  async getOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await GetOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code.toString());
      if (!result) throw createError.Unauthorized("ورود شما با خطا مواجه شد.");
      res.status(StatusCodes.OK).send({
        statusCode: StatusCodes.OK,
        data: {
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد.",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await CheckOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = (await UserModel.findOne({ mobile })) as {
        _id: string;
        otp: { code: string; expiresIn: number };
      };
      if (!user) throw createError.NotFound("کاربر یافت نشد.");
      if (user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد.");
      const now = Date.now();
      if (+user.otp.expiresIn < now) throw createError.Unauthorized("توکن شما منقضی شده است.");
      const accessToken = await signAccessToken(user._id.toString());
      const refreshToken = await signRefreshToken(user._id.toString());
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refresh_token } = req.body;
      const mobile = await verifyRefreshToken(refresh_token);
      const user = (await UserModel.findOne({ mobile })) as {
        _id: string;
        otp: { code: string; expiresIn: number };
      };
      if (!user) throw createError.NotFound("کاربر یافت نشد.");
      const accessToken = await signAccessToken(user._id.toString());
      const newRefreshToken = await signRefreshToken(user._id.toString());
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile: string, code: string) {
    const result = await this.checkExistUser(mobile);
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000, // تا دو دقیقه آینده فرصت هست برای احراز این کد
    };
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      roles: [ConstantConfig.RULES.USER, ConstantConfig.RULES.ADMIN],
    }));
  }

  async checkExistUser(mobile: string) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile: string, objectData: { [key: string]: any } = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key];
    });
    const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData });
    return !!updateResult.modifiedCount;
  }
}

export const UserAuthenticationController = new UserAuthController();
