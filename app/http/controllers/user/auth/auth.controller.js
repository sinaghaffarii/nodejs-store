const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const { RandomNumberGenerator } = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/user");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
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
      next(createError.BadRequest(error.message));
    }
  }

  async saveUser(mobile, code) {
    const result = await this.checkExistUser(mobile);
    let otp = {
      code,
      expiresIn: EXPIRES_IN, // تا دو دقیقه آینده فرصت هست برای احراز این کد
    };
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Roles: [USER_ROLE],
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
