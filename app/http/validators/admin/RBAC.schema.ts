import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";

export const AddRoleSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).error(new Error("عنوان نقش درست نمیباشد.")),
  description: Joi.string().min(0).max(100).error(new Error("توضیحات نقش صحیح نمیباشد.")),
  permissions: Joi.array()
    .items(Joi.string().pattern(ConstantConfig.MongoIDPattern))
    .error(new Error("دسترسی های ارسال شده صحیح نمیباشد.")),
});

export const AddPermissionSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).error(new Error("اسم دسترسی صحیح نمیباشد")),
  description: Joi.string().min(0).max(100).error(new Error("توضیحات دسترسی صحیح نمیباشد.")),
});
