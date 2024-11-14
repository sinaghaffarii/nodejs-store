const Joi = require("joi");

// const authSchema = Joi.object().keys({
//   email: Joi.string()
//     .email()
//     .required()
//     .trim()
//     .lowercase()
//     .error(new Error("ایمیل وارد شده صحیح نمیباشد.")),
//   password: Joi.string()
//     .min(6)
//     .max(16)
//     .trim()
//     .required()
//     .error(new Error("کلمه عبور وارد شده باید بین 6 الی 16 کاراکتر باشد.")),
// });

const authSchema = Joi.object().keys({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره موبایل وارد شده نادرست است.")),
});

module.exports = {
  authSchema,
};
