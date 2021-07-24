import request from "supertest";
import { app } from "../app";
import appConfig from "../config/env";
import { mongoose } from "../config/mongoConnect";
import { errors } from "../config/error";
import jwt from "jsonwebtoken";
import {eventModel} from "../model/event";

const url = "/api/v1/events";

const eventInfo = {
  name: "Event test",
  description: "This is description",
  startDate: "2021-11-01",
  dueDate: "2021-12-01"
};
const token = jwt.sign(
  { username: appConfig.username },
  appConfig.jwt_key, {
  expiresIn: appConfig.jwt_expiration
});
const commonHeaders = {
  authorization: `Bearer ${token}`,
  Accept: "application/json"
};

describe("Event APIs", () => {
  afterAll(async () => {
    await eventModel.deleteMany({})
    await mongoose.disconnect();
  });

  describe("[POST] - Create Event", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .post(`${url}/create`)
        .set(commonHeaders)
        .send(eventInfo);
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("should return error DUEDATE_IS_REQUIRED with status code 400", async () => {
      const response = await request(app)
        .post(`${url}/create`)
        .set(commonHeaders)
        .send({
          name: "Event test",
          description: "This is description",
          startDate: "2021-11-01"
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toEqual("DUEDATE_IS_REQUIRED");
    });

    it("should return error NOT_AUTHENTICATE with status code 401", async () => {
      const response = await request(app)
        .post(`${url}/create`)
        .send({
          name: "Event test",
          description: "This is description",
          startDate: "2021-11-01",
          dueDate: "2021-11-01"
        });
      expect(response.statusCode).toBe(401);
      expect(response.body.code).toEqual(errors.NOT_AUTHENTICATE.code);
    });
  });
});
