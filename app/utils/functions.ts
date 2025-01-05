import JWT from "jsonwebtoken";
import createError from "http-errors";
import { UserModel } from "../models/user";
// import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "./constants";
import { ConstantConfig } from "./constants";

import { RefreshTokenModel } from "../models/refreshToken";
import path from "path";
import fs from "fs";

export const RandomNumberGenerator = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
};

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = ConstantConfig;

export const signAccessToken = (userId: string) => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    if (!user) return reject(createError.NotFound("کاربر یافت نشد."));
    const payload = {
      mobile: user.mobile,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "2h",
    };
    JWT.sign(
      payload,
      secret,
      options,
      (error: Error | null, token: string | undefined) => {
        if (error) reject(createError.InternalServerError("خطای سمت سرور"));
        resolve(token);
      }
    );
  });
};

export const signRefreshToken = (userId: string) => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    if (!user) return reject(createError.NotFound("کاربر یافت نشد."));
    const payload = {
      mobile: user.mobile,
    };
    const secret = REFRESH_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, options, async (error, token) => {
      if (error) reject(createError.InternalServerError("خطای سمت سرور"));

      const refreshToken = new RefreshTokenModel({ userId, token });
      await refreshToken.save();
      resolve(token);
    });
  });
};

export const verifyRefreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      token,
      REFRESH_TOKEN_SECRET_KEY,
      async (error: Error | null, payload: any) => {
        if (error)
          return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user)
          return reject(createError.Unauthorized("حساب کاربری یافت نشد."));
        const refreshToken = await RefreshTokenModel.findOne({
          userId: user?._id,
        });
        if (refreshToken?.token === token) return resolve(mobile);
        reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد."));
      }
    );
  });
};

export const deleteFileInPublic = (fileAddress: string) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

interface File {
  filename: string;
  // Add other properties if necessary, e.g., path: string;
}
export const ListOfImagesFromRequest = (
  files: File[],
  fileUploadPath: string
) => {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
};
