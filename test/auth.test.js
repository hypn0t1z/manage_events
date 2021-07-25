import request from "supertest";
import { app } from "../app";
import appConfig from "../config/env";
import { errors } from "../config/error";

const url = "/api/v1/auth/login";

const loginInfo = {
  username: appConfig.username,
  password: appConfig.password
};

describe("Auth Test", () => {
  it("POST /auth/login", async () => {
    const response = await request(app)
      .post(url)
      .send(loginInfo);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).not.toBeNull();
    global.token = response.body.token;
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
