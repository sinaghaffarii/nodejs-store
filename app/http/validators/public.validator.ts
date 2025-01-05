import Joi from "joi";
import { ConstantConfig } from "@/utils/constants";
import createHttpError from "http-errors";

export const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(ConstantConfig.MongoIDPattern)
    .error(
      () => createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد").message
    ),
});
