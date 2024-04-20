const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory type required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood Group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantityofBlood: {
      type: Number,
      required: [true, "Blood Quanity is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organization is required"],
    },

    // if inventoryType is "out" then hospital is required
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },

    // if inventoryType is "in" then donor is required
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
    _id: {
      type: mongoose.Types.ObjectId, // Define _id field as ObjectId
      auto: true, // Automatically generated ObjectId
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventories", inventorySchema);

module.exports = Inventory;
