const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");
const User = require("../models/userModel");

// Route to send blood donation request emails
router.post("/send-email", async (req, res) => {
  try {
    const { bloodGroup, date, time, contactNumber, location } =
      req.body;
    const formattedDate = moment(date).format("dddd, MMMM Do YYYY");

    // Retrieve registered donors with the same blood group
    const donors = await User.find({ userType: "donor", bloodGroup });

    // Retrieve all organizations
    const organizations = await User.find({ userType: "organization" });

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ragatsewa@gmail.com",
        pass: "gevo uany gbcl velf",
      },
    });

    // Compose and send emails to donors with the specified blood group
    for (const donor of donors) {
      const emailMessage = `
        <html>  
          <body>
            <p>Dear <strong>${donor.name}</strong> Donor,</p>
            <p>There is an urgent blood donation request for <strong>${bloodGroup}</strong> blood type.</p>
            <p>The blood donation is needed on <strong>${formattedDate}, ${time}</strong> at <strong>${location}</strong>.</p>
            <p>If you are interested, please reply to this email or click <a href="mailto:ragatsewa@gmail.com?subject=Interest in Blood Donation Request&body=I am interested in the blood donation request on ${formattedDate}, at ${location}.">here</a> to express your interest.</p
            <p>Contact Number: <strong>${contactNumber}</strong></p> 
            <p><strong>Note: Contact only if you are interested</strong>.</p>
            <P>Your contribution can save lives.</P>
            <p>Best Regards,<br><strong>Ragat Sewa</strong></p>
          </body>
        </html>
      `;

      const mailOptions = {
        from: "ragatsewa@gmail.com",
        to: donor.email,
        subject: "Urgent Blood Donation Request",
        html: emailMessage,
      };

      await transporter.sendMail(mailOptions);
    }

    // Send emails to all organizations
    for (const organization of organizations) {
      const emailMessage = `
        <html>
          <body>
            <p>Dear <strong>${organization.organizationName}</strong> Organization,</p>
            <p>There is an urgent blood donation request for <strong>${bloodGroup}</strong> blood type.</p>
            <p>The blood donation is needed on <strong>${formattedDate}, ${time}</strong> at <strong>${location}</strong>.</p>
            <p>Contact Number: <strong>${contactNumber}</strong> </p>
            <p>Your support is appreciated.</p>
            <p>Best Regards,<br><strong>Ragat Sewa</strong></p>
          </body>
        </html>
      `;

      const mailOptions = {
        from: "ragatsewa@gmail.com",
        to: organization.email,
        subject: "Urgent Blood Donation Request",
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

module.exports = router;
