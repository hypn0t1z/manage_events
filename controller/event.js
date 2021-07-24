import express from "express";
import eventService from "../service/event";
import { asyncWrapper } from "../utils/asyncWrapper";
import { authorized } from "../middleware/auth.middleware";
import { checkIdValidator, createEventValidator } from "../middleware/validator/event";

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
event.get("/:eventId", [checkIdValidator, authorized()], asyncWrapper(eventService.getEventDetail));

// update by ID
event.put("/:eventId", asyncWrapper(eventService.update));

// Delete
event.delete("/:eventId", asyncWrapper(eventService.delete));

export { event };
