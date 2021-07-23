import mongoose from "mongoose";

const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const eventModel = mongoose.model("event", eventSchema);

export { eventModel };
