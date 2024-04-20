const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Title is required"],
    },

    eventDate: {
      type: String,
      required: [true, "Date is required"],
    },

    eventVenue: {
      type: String,
      required: [true, "Location is required"],
    },
    eventTime: {
      type: String,
      required: [true, "Time is required"],
      enum: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      required: [true, "Organization is required"],
    },
    _id: {
      type: mongoose.Types.ObjectId, // Define _id field as ObjectId
      auto: true, // Automatically generated ObjectId
    },
  },
  { timestamps: true }
  
);

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
