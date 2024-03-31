const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");

// Post Events
router.post("/post-event", authMiddleware, async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      eventVenue,
      contact,
      description,
    } = req.body;

    // Get the user ID from the authenticated user using req.body.userId
    const organization = req.body.userId;

    // Create a new event instance
    const Newevent = new Event({
      eventName,
      eventDate,
      eventTime,
      eventVenue,
      contact,
      description,
      organization,
    });

    // Save the event to the database
    await Newevent.save();

    res
      .status(201)
      .json({ success: true, message: "Event posted successfully" });
  } catch (error) {
    console.error("Error posting event:", error); // Log detailed error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get events
router.get("/get-event", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ organization: req.body.userId }).sort({
      createdAt: -1,
    });

    return res.send({
      success: true,
      message: "Events Fetched Successfully",
      data: events,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
