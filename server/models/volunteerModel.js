const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
