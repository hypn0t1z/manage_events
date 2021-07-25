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

const eventModel = mongoose.model("event", eventSchema);

export { eventModel };
