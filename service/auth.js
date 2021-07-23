import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../config/env";
import { errors } from "../config/error";
import httpStatus from "../utils/httpStatus";

const authService = {};

// Login user
authService.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== appConfig.username || password !== appConfig.password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(errors.USER_NOT_FOUND)
    }
    const token = jwt.sign(
      { username },
      appConfig.jwt_key,
      { expiresIn: appConfig.jwt_expiration }
    );
    return res.json({ token });
  } catch (error) {
    console.log(error)
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error });
  }
};

export default authService;
