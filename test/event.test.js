import request from "supertest";
import { app } from "../app";
import appConfig from "../config/env";
import mongoose from "mongoose";
import { errors } from "../config/error";
import jwt from "jsonwebtoken";
import { eventModel } from "../model/event";

const url = "/api/v1/events";

const eventInfo = {
  name: "Event test",
  description: "This is description",
  startDate: "2021-11-01",
  dueDate: "2021-12-01"
};
const token = jwt.sign({ username: appConfig.username }, appConfig.jwt_key, {
  expiresIn: appConfig.jwt_expiration
});
const commonHeaders = {
  authorization: `Bearer ${token}`,
  Accept: "application/json"
};

let eventId;

/**
 * Event APIs
 */
describe("Event APIs", () => {
  beforeAll(async() => {
    let connectionUri = appConfig.dbConnectionString;
    await mongoose.connect(connectionUri, {
      //autoReconnect: true,
      //reconnectTries: 1000000,
      //reconnectInterval: 3000,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await eventModel.deleteMany({});
    await mongoose.connection.close();
  });

  /**
   * Create Event
   */
  describe("[POST] - Create Event", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .post(`${url}`)
        .set(commonHeaders)
        .send(eventInfo);
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBeNull();
      eventId = response.body._id;
    });

    it("should return error DUEDATE_IS_REQUIRED with status code 400", async () => {
      const response = await request(app)
        .post(`${url}`)
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
        .post(`${url}`)
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

  /**
   * Get event detail
   */
  describe("[GET] - Get Event Detail", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .get(`${url}/${eventId}`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("should return null if not exist, with status code 200", async () => {
      const response = await request(app)
        .get(`${url}/60fb8cf2a38a4f2eb156296e`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(null);
    });

    it("should return validate error with status code 400", async () => {
      const response = await request(app)
        .get(`${url}/${eventId}1`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(400);
      expect(response.body.name).toEqual("eventId");
    });

    it("should return error NOT_AUTHENTICATE with status code 401", async () => {
      const response = await request(app).get(`${url}/${eventId}`);
      expect(response.statusCode).toBe(401);
      expect(response.body.code).toEqual(errors.NOT_AUTHENTICATE.code);
    });
  });

  /**
   * Update event
   */
  describe("[PUT] - Update Event", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .put(`${url}/${eventId}`)
        .set(commonHeaders)
        .send({
          name: "hungdb123",
          dueDate: "2021-12-01",
          description: "This is description",
          startDate: "2021-11-01"
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("should return error NAME_IS_REQUIRED with status code 400", async () => {
      const response = await request(app)
        .put(`${url}/${eventId}`)
        .set(commonHeaders)
        .send({
          dueDate: "2021-12-01",
          description: "This is description",
          startDate: "2021-11-01"
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toEqual("NAME_IS_REQUIRED");
    });

    it("should return error when objectId invalid, with status code 400", async () => {
      const response = await request(app)
        .put(`${url}/60fb8cf2a38a4f2eb156296e1`)
        .set(commonHeaders)
        .send(eventInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.name).toEqual("eventId");
    });

    it("should return error EVENT_NOT_FOUND with status code 404", async () => {
      const response = await request(app)
        .put(`${url}/60fb8cf2a38a4f2eb156296e`)
        .set(commonHeaders)
        .send(eventInfo);
      expect(response.statusCode).toBe(404);
      expect(response.body.code).toEqual(errors.EVENT_NOT_FOUND.code);
    });

    it("should return error NOT_AUTHENTICATE with status code 401", async () => {
      const response = await request(app).get(`${url}/${eventId}`);
      expect(response.statusCode).toBe(401);
      expect(response.body.code).toEqual(errors.NOT_AUTHENTICATE.code);
    });
  });

  /**
   * Delete event
   */
  describe("[DELETE] - Delete Event", () => {
    it("should return status code 200", async () => {
      const response = await request(app)
        .delete(`${url}/${eventId}`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(true);
    });

    it("should return error when objectId invalid, with status code 400", async () => {
      const response = await request(app)
        .delete(`${url}/60fb8cf2a38a4f2eb156296e1`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(400);
      expect(response.body.name).toEqual("eventId");
    });

    it("should return error EVENT_NOT_FOUND with status code 404", async () => {
      const response = await request(app)
        .delete(`${url}/60fb8cf2a38a4f2eb156296e`)
        .set(commonHeaders);
      expect(response.statusCode).toBe(404);
      expect(response.body.code).toEqual(errors.EVENT_NOT_FOUND.code);
    });

    it("should return error NOT_AUTHENTICATE with status code 401", async () => {
      const response = await request(app).get(`${url}/${eventId}`);
      expect(response.statusCode).toBe(401);
      expect(response.body.code).toEqual(errors.NOT_AUTHENTICATE.code);
    });
  });
});
