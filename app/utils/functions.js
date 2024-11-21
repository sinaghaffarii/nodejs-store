const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constants");

function RandomNumberGenerator() {
  return Math.floor(10000 + Math.random() * 90000);
}

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, secret, options, (error, token) => {
      if (error) reject(createError.InternalServerError("خطای سمت سرور"));
      resolve(token);
    });
  });
}

module.exports = {
  RandomNumberGenerator,
  signAccessToken,
};
