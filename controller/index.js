import express from "express";
import { auth } from "./auth";
import { event } from "./event";

const apiRoutes = express.Router();

apiRoutes.use("/auth", auth);
apiRoutes.use("/events", event);

export default apiRoutes;
