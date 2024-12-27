const createError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const {
  RandomNumberGenerator,
  signAccessToken,
  verifyRefreshToken,
  signRefreshToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/user");
const { RULES } = require("../../../../utils/constants");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("ورود شما با خطا مواجه شد.");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد.",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) createError.NotFound("کاربر یافت نشد.");
      if (user.otp.code != code)
        throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد.");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("توکن شما منقضی شده است.");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refresh_token } = req.body;
      const mobile = await verifyRefreshToken(refresh_token);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await signAccessToken(user._id);
      const newRefreshToken = await signRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile, code) {
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
      roles: [RULES.USER, RULES.ADMIN],
    }));
  }

  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
