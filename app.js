import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mainRouter from "./controller/index";
import { connectMongo } from "./config/mongoConnect";

const app = express();

app.use(bodyParser.json());

// https debug
app.use(morgan("dev"));

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  // Connect Mongo
  connectMongo();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on PORT ${PORT}`);
  });
}

export { app };
