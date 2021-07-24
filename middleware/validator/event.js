import Joi from "joi";
import { validator } from "./index";
import { VALIDATOR_TYPE } from "../../constants/common";

export const createEventValidator = validator(
  Joi.object().keys({
    name: Joi.string()
      .min(2)
      .required(),
    description: Joi.string().trim(),
    startDate: Joi.date().required(),
    dueDate: Joi.date()
      .min(Joi.ref("startDate"))
      .required()
  }),
  VALIDATOR_TYPE.BODY
);
