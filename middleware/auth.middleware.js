import jwt from "jsonwebtoken";
import appConfig from "../config/env";
import { errors } from "../config/error";

export const authorized = () => async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ");
      token = token.length === 2 && token[0] === "Bearer" ? token[1] : null;

      req.body.user = jwt.verify(token, appConfig.jwt_key);

      return next();
    } catch (e) {
      return res.status(401).json(errors.NOT_AUTHENTICATE);
    }
  };
