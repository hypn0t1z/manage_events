import { errors } from "../../config/error";

/**
 * Middleware check validator
 * @param schema
 * @param property
 * @returns {function(*, *, *): Promise<*|undefined>}
 */
export const validator = (schema, property) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req[property], {
      stripUnknown: true
    });
    if (!error) {
      return next();
    }
    const { details } = error;
    if (details[0]) {
      const name = details[0].context.key;

      let code = details[0].message
        .replace(/"/g, "")
        .replace(/ /g, "_")
        .toUpperCase();
      code = (errors[code] && errors[code].code) || code;

      let { message } = details[0];
      message = (errors[message] && errors[message].message) || message;

      return res.status(400).json({ code, name, message });
    }
  };
};
