const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");

// Post Events
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

    // Get the user ID from the authenticated user using req.user.userId
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
    console.error("Error posting event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get all events
router.get("/get-event", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.send({
      success: true,
      message: "Events Fetched Successfully",
      data: events,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Get events posted by organization
router.get("/get-events-by-organization", authMiddleware, async (req, res) => {
  try {
    // Fetch events posted by the authenticated organization
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

// Delete event by ID
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }

    await event.deleteOne(); // Use deleteOne() method instead of delete()
    return res.send({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//Update Event by ID
// Update Event by ID
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }

    // Update event fields
    Object.keys(req.body).forEach((key) => {
      event[key] = req.body[key];
    });

    // Save the updated event to the database
    await event.save();

    return res.send({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
