import request from "supertest";
import { app } from "../app";
import appConfig from "../config/env";
import { mongoose } from "../config/mongoConnect";
import { errors } from "../config/error";

const url = "/api/v1/events";

const eventInfo = {
  "name": "Event test",
  "description": "This is description",
  "startDate": "2021-11-01",
  "endDate": "2021-12-01"
};

let token;

describe("[POST] - Create Event", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return status code 200", async () => {
    const response = await request(app)
      .post(url)
      .send(eventInfo);
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });

  it("should return error PASSWORD_IS_REQUIRED with status code 400", async () => {
    const response = await request(app)
      .post(url)
      .send({
        username: appConfig.username
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.code).toEqual("PASSWORD_IS_REQUIRED");
  });

  it("should return error USER_NOT_FOUND with status code 400", async () => {
    const response = await request(app)
      .post(url)
      .send({
        username: "hungdb1",
        password: "123123"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.code).toEqual(errors.USER_NOT_FOUND.code);
  });
});
