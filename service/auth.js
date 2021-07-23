import jwt from "jsonwebtoken";
import appConfig from "../config/env";
import { errors } from "../config/error";
import httpStatus from "../utils/httpStatus";

const authService = {};

// Login user
authService.login = async (req, res) => {
  const { username, password } = req.body;
  if (username !== appConfig.username || password !== appConfig.password) {
    return res.status(httpStatus.BAD_REQUEST).json(errors.USER_NOT_FOUND);
  }
  const token = jwt.sign({ username }, appConfig.jwt_key, {
    expiresIn: appConfig.jwt_expiration
  });
  return res.json({ token });
};

export default authService;
