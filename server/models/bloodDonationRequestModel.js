// models/BloodDonationRequest.js

const mongoose = require("mongoose");

const bloodDonationRequestSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  conatactNumber:{
    type: String,
    required: true,    
  },
  location: {
    type: String,
    required: true,
  },
  
});

const BloodDonationRequest = mongoose.model("BloodDonationRequest", bloodDonationRequestSchema);

module.exports = BloodDonationRequest;
