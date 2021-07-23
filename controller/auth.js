import express from "express";
import authService from "../service/auth";
import { loginValidator } from "../validator/auth";
import { asyncWrapper } from "../utils/asyncWrapper";

const auth = express.Router();

// Login
auth.post("/login", loginValidator,  asyncWrapper(authService.login));

export { auth };
