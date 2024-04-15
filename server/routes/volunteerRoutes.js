const router = require("express").Router();
const Volunteer = require("../models/volunteerModel");

// POST: Create a new volunteer registration
router.post("/register-volunteers", async (req, res) => {
  try {
    const { title, name, email, phone, eventId } = req.body;

    // Create a new volunteer registration
    const volunteer = new Volunteer({ title, name, email, phone, eventId });
    await volunteer.save();

    res.status(201).json({
      success: true,
      message: "Volunteer registration created successfully",
    });
  } catch (error) {
    console.error("Error creating volunteer registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/eventVolunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ success: true, data: volunteers });
  } catch (error) {
    console.error("Error retrieving event volunteers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
