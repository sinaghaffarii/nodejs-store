import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";
import createHttpError from "http-errors";

export const CreateProductSchema = Joi.object({
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
  tags: Joi.array()
    .min(1)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد.")
    ),
  colors: Joi.array()
    .items(Joi.string().valid("red", "green", "blue", "yellow", "purple"))
    .error((errors) => {
      return errors.map((err) => {
        if (err.code === "array.min") {
          err.message = "حداقل یک رنگ باید انتخاب شود.";
        } else if (err.code === "array.max") {
          err.message = "رنگ‌های انتخابی نمی‌تواند بیشتر از 20 آیتم باشد.";
        } else {
          err.message = "رنگ‌های انتخابی نامعتبر است.";
        }
        return err;
      });
    }),
  category: Joi.string()
    .pattern(ConstantConfig.MongoIDPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد.")),
  price: Joi.number().error(
    createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد.")
  ),
  discount: Joi.number().error(
    createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد.")
  ),
  count: Joi.number().error(
    createHttpError.BadRequest("تعداد وارد شده صحیح نمیباشد.")
  ),
  height: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نمیباشد.")),
  weight: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("وزن وارد شده صحیح نمیباشد.")),
  width: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("عرض وارد شده صحیح نمیباشد.")),
  length: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("طول وارد شده صحیح نمیباشد.")),
  type: Joi.string().pattern(/(virtual|physical)/i),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});
