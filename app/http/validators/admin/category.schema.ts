import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";

export const AddCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی درست نمیباشد.")),
  parent: Joi.string()
    .allow("")
    .pattern(ConstantConfig.MongoIDPattern)
    .allow("")
    .error(new Error("شناسه وارد شده صحیح نمیباشد")),
});

export const UpdateCategorySchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی درست نمیباشد.")),
});
