// models/BloodDonationRequest.js

const mongoose = require("mongoose");

const bloodDonationRequestSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  requestEmail: {
    type: String,
    required: true,
  },
});

const BloodDonationRequest = mongoose.model(
  "BloodDonationRequest",
  bloodDonationRequestSchema
);

module.exports = BloodDonationRequest;
