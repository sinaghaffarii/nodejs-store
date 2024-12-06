const Joi = require("joi");
const { MongoIDPattern } = require("../../../utils/constants");

const addCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی درست نمیباشد.")),
  parent: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .allow("")
    .error(new Error("شناسه وارد شده صحیح نمیباشد")),
});

const updateCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی درست نمیباشد.")),
});

module.exports = {
  addCategorySchema,
  updateCategorySchema,   
};
