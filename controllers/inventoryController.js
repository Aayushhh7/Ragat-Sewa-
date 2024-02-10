const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Create Inventory
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (inventoryType === "in" && user.role !== "donor") {
      throw new Error("Not a donor");
    }
    if (inventoryType === "out" && user.role !== "user") {
      throw new Error("Not a user");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }
    //Save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

// Get all Blood Records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "All Records Fetched Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Inventory",
      error,
    });
  }
};

module.exports = { createInventoryController, getInventoryController };
