import express from "express";
import { auth } from "./auth";
import { event } from "./event";

const apiRoutes = express.Router();

apiRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

apiRoutes.use("/auth", auth);

export default apiRoutes;
