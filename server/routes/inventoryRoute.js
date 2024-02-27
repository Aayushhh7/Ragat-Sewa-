const router = require("express").Router();
const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const { message } = require("antd");
const mongoose = require("mongoose");

//add inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // validate email and InventoryType
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Email");

    if (req.body.inventoryType === "in" && user.userType !== "donor") {
      throw new Error("The email is not recognized as a donor");
    }

    if (req.body.inventoryType === "out" && user.userType !== "hospital") {
      throw new Error("The email is not recognized as a hospital");
    }

    if (req.body.inventoryType === "out") {
      // check if inventory is available
      const requestedGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantityofBlood;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      const totalInofRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organization: organization,
            inventoryType: "in",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantityofBlood" },
          },
        },
      ]);

      const totalIn = totalInofRequestedGroup[0].total;

      const totalOutofRequestedGroup = await Inventory.aggregate([
        {
          $match: {
            organization: organization,
            inventoryType: "out",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantityofBlood" },
          },
        },
      ]);

      const totalOut = totalOutofRequestedGroup[0].total;

      const availableQuantityofRequestedGroup = totalIn - totalOut;

      if (availableQuantityofRequestedGroup < requestedQuantity) {
        throw new Error(
          `Only ${availableQuantityofRequestedGroup} units of ${requestedGroup} is available`
        );
      }

      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    // add inventory
    const inventory = new Inventory(req.body);
    await inventory.save();

    return res.send({ success: true, message: "Inventory Added Successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//get inventory
router.get("/get", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find({ organization: req.body.userId })
      .populate("donor")
      .populate("hospital");
    return res.send({
      success: true,
      message: "Inventory Fetched Successfully",
      data: inventory,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
