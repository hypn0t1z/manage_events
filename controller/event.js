import express from "express";
import eventService from "../service/event";
import { asyncWrapper } from "../utils/asyncWrapper";
import { createEventValidator } from "../middleware/validator/event";
import { authorized } from "../middleware/auth.middleware";

const event = express.Router();

// Create
event.post(
  "/create",
  [createEventValidator, authorized()],
  asyncWrapper(eventService.createEvent)
);

// GetAll Data
event.get("/", asyncWrapper(eventService.findAll));

// GetBy ID
event.get("/:eventId", asyncWrapper(eventService.findOne));

// update by ID
event.put("/:eventId", asyncWrapper(eventService.update));

// Delete
event.delete("/:eventId", asyncWrapper(eventService.delete));

export { event };
