const nodemailer = require("nodemailer");
const Donor = require("../models/userModel");

async function sendEmail(bloodGroup, date, time, location) {
  try {
    // Retrieve registered donors with the same blood group
    const donors = await Donor.find({ bloodGroup });

    // Compose email message
    const emailMessage = `Dear Donor,\n\nThere is an urgent blood donation request for ${bloodGroup} blood type. The donation event will take place on ${date} at ${location}. Your contribution can save lives.\n\nBest Regards,\nBlood Donation Team`;

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
      service: "gmail",
      auth: {
        user: "ragatsewa@gmail.com",
        pass: "Ragatsewa@123",
      },
    });

    // Send emails to each donor
    for (const donor of donors) {
      const mailOptions = {
        from: "ragatsewa@gmail.com",
        to: donor.email,
        subject: "Blood Donation Request",
        text: emailMessage,
      };
      await transporter.sendMail(mailOptions);
    }

    console.log("Emails sent successfully.");
    return { success: true, message: "Emails sent successfully." };
  } catch (error) {
    console.error("Error sending emails:", error);
    throw error;
  }
}

module.exports = sendEmail;
