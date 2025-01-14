import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";
import createHttpError from "http-errors";

export const CreateCourseSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد.")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  tags: Joi.array().min(1).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد.")),
  category: Joi.string().pattern(ConstantConfig.MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد.")),
  price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد.")),
  discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد.")),
  type: Joi.string().pattern(/(free|cash|special)/i) /* free - cash - special */,
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});
