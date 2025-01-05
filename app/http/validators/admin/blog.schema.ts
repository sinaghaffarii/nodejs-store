import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";
import createHttpError from "http-errors";

const CreateBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد.")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")
  ),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  tags: Joi.array()
    .min(1)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد.")
    ),
  category: Joi.string()
    .pattern(ConstantConfig.MongoIDPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد.")),
  fileUploadPath: Joi.allow(),
});

export default CreateBlogSchema;
