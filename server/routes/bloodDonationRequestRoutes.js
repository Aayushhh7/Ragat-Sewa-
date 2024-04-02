const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment"); // Import moment library
const User = require("../models/userModel"); // Import User model

router.post("/send-email", async (req, res) => {
  try {
    const { bloodGroup, date, time, contactNumber, location } = req.body;

    // Format the date to include the full day name
    const formattedDate = moment(date).format("dddd, MMMM Do YYYY");

    // Retrieve registered donors with the same blood group
    const donors = await User.find({ userType: "donor", bloodGroup });

    // Retrieve all organizations
    const organizations = await User.find({ userType: "organization" });

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
      service: "gmail",
      auth: {
        user: "ragatsewa@gmail.com",
        pass: "gevo uany gbcl velf",
      },
    });

    // Send emails to donors with the specified blood group
    for (const donor of donors) {
      // Compose email message for donors
      const emailMessage = `
      <html>  
          <p>Dear <strong>${donor.name}</strong> Donor,</p>
          <p>There is an urgent blood donation request for <strong>${bloodGroup}</strong> blood type.</p>
          <p>The donation event will take place on <strong>${formattedDate} ,${time} </strong> at <strong>${location}</strong>.</p>
          <p>Contact us on <strong>${contactNumber}</strong>.</p>
          <p>Your contribution can save lives.</p>
          <p>Best Regards,<br>Ragat Sewa</p>
        </body>
      </html>
      `;

      const mailOptions = {
        from: "ragatsewa@gmail.com",
        to: donor.email,
        subject: "Blood Donation Request",
        html: emailMessage,
      };
      await transporter.sendMail(mailOptions);
    }

    // Send emails to all organizations
    for (const organization of organizations) {
      // Compose email message for organizations
      const emailMessage = `
      <html>
        <body>
          <p>Dear <strong>${organization.organizationName}</strong> Organization,</p>
          <p>There is an urgent blood donation request for <strong>${bloodGroup}</strong> blood type.</p>
          <p>The donation event will take place on <strong>${formattedDate} ,${time}</strong> at <strong>${location}</strong>.</p>
          <p>Contact us on <strong>${contactNumber}</strong>.</p>
          <p>Your support is appreciated.</p>
          <p>Best Regards,<br><strong>Ragat Sewa</strong></p>
        </body>
      </html>
      `;

      const mailOptions = {
        from: "ragatsewa@gmail.com",
        to: organization.email,
        subject: "Blood Donation Request",
        html: emailMessage,
      };
      await transporter.sendMail(mailOptions);
    }

    console.log("Emails sent successfully.");
    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Error sending emails." });
  }
});

// GET request to retrieve all donors
router.get("/donor", async (req, res) => {
  try {
    const donors = await User.find({ userType: "donor" });
    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Error retrieving donors:", error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving donors." });
  }
});

module.exports = router;
