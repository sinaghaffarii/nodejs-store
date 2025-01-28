import JWT from "jsonwebtoken";
import createError from "http-errors";
import { UserModel } from "../models/user";
// import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "./constants";
import { ConstantConfig } from "./constants";
import { fileURLToPath } from "url";

import { RefreshTokenModel } from "../models/refreshToken";
import path from "path";
import fs from "fs";
import { IChapter, IEpisode } from "@/models/course";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RandomNumberGenerator = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
};

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = ConstantConfig;

const signAccessToken = (userId: string) => {
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
    JWT.sign(payload, secret, options, (error: Error | null, token: string | undefined) => {
      if (error) reject(createError.InternalServerError("خطای سمت سرور"));
      resolve(token);
    });
  });
};

const signRefreshToken = (userId: string) => {
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

const verifyRefreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (error: Error | null, payload: any) => {
      if (error) return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return reject(createError.Unauthorized("حساب کاربری یافت نشد."));
      const refreshToken = await RefreshTokenModel.findOne({
        userId: user?._id,
      });
      if (refreshToken?.token === token) return resolve(mobile);
      reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد."));
    });
  });
};

const deleteFileInPublic = (fileAddress: string) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

interface File {
  filename: string;
  // Add other properties if necessary, e.g., path: string;
}
const ListOfImagesFromRequest = (files: File[], fileUploadPath: string) => {
  if (files?.length > 0) {
    return files.map((file) => path.join(fileUploadPath, file.filename)).map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
};

const copyObject = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

const setFeatures = (body: any) => {
  const { width, height, weight, length, colors } = body;
  let feature = {
    colors: colors,
    width: 0,
    height: 0,
    weight: 0,
    length: 0,
  };
  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
    if (!width) feature.width = 0;
    else feature.width = +width;
    if (!height) feature.height = 0;
    else feature.height = +height;
    if (!weight) feature.weight = 0;
    else feature.weight = +weight;
    if (!length) feature.length = 0;
    else feature.length = +length;
  }

  return feature;
};

const deleteInvalidPropertyInObject = (data: any, blackListFields: string[]) => {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
};

function getTime(time: number): string {
  let total = Math.round(time) / 60;
  let [min, percentage] = String(total).split(".");
  if (percentage === undefined) percentage = "0";
  let sec = Math.round((parseInt(percentage.substring(0, 2)) * 60) / 100);
  let hour: number | string = 0;
  if (parseInt(min) > 59) {
    total = parseInt(min) / 60;
    [hour, percentage] = String(total).split(".");
    if (percentage === undefined) percentage = "0";
    min = String(Math.round((parseInt(percentage.substring(0, 2)) * 60) / 100));
  }
  if (parseInt(hour as string) < 10) hour = `0${hour}`;
  if (parseInt(min) < 10) min = `0${min}`;
  if (sec < 10) sec = Number(`0${sec}`);
  return `${hour}:${min}:${sec}`;
}

function getTimeOfCourse(chapters: IChapter[]): string {
  let totalSeconds = 0;

  for (const chapter of chapters) {
      for (const episode of chapter.episodes) {
      const ep = episode as unknown as IEpisode;
      let timeParts = ep?.time ? ep.time.split(":") : ["00", "00", "00"];
      if (timeParts.length === 3) {
        totalSeconds += Number(timeParts[0]) * 3600; // convert hour to seconds
        totalSeconds += Number(timeParts[1]) * 60; // convert minutes to seconds
        totalSeconds += Number(timeParts[2]); // add seconds
      } else if (timeParts.length === 2) {
        totalSeconds += Number(timeParts[0]) * 60; // convert minutes to seconds
        totalSeconds += Number(timeParts[1]); // add seconds
      }
    }
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export {
  RandomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  ListOfImagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertyInObject,
  getTime,
  getTimeOfCourse,
};
