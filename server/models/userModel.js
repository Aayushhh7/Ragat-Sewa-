const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "user type is required"],
      enum: ["donor", "organization", "hospital"],
    },
    // is only required if userType is donor or admin
    name: {
      type: String,
      required: function () {
        if (tthis.userType === "donor") {
          return true;
        }
        return false;
      },
      message: "Name is required",
    },

    // is only required if userType is organization
    organizationName: {
      type: String,
      required: function () {
        if (this.userType === "organization") {
          return true;
        }
        return false;
      },
    },

    // is only required if userType is hospital
    hospitalName: {
      type: String,
      required: function () {
        if (this.userType === "hospital") {
          return true;
        }
        return false;
      },
    },

    // is only required if userType is organization or hospital
    website: {
      type: String,
      required: function () {
        if (this.userType == "organization" || this.userType == "hospital") {
          return true;
        }
        return false;
      },
    },
    // is only required if userType is donor
    bloodGroup: {
      type: String,
      required: function () {
        if (this.userType == "donor") {
          return true;
        }
        return false;
      },
    },

    // Common for all userType
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
