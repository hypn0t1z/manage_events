import Joi from 'joi';
import { validator } from "./index";
import { VALIDATOR_TYPE } from "../constants/common";

export const loginValidator = validator(Joi.object().keys({
  username: Joi.string().trim().lowercase().required(),
  password: Joi.string().trim().required()
}), VALIDATOR_TYPE.BODY)
