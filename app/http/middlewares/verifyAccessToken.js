const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");
const { UserModel } = require("../../models/user");
const createHttpError = require("http-errors");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["bearer", "Bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized(
    "حساب کاربری شناسایی نشد، لطفا وارد حساب کاربری خود شوید."
  );
}

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (error, payload) => {
      try {
        if (error) throw createError.Unauthorized("وارد حساب کاربری خود شوید");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد.");
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (user.roles.includes(role)) return next();
      throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید.");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  verifyAccessToken,
  checkRole,
};
