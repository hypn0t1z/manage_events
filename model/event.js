import mongoose from "mongoose";

const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const skipInit = process.env.NODE_ENV === "test";
const eventModel = mongoose.model("event", eventSchema, "event", skipInit);

export { eventModel };
