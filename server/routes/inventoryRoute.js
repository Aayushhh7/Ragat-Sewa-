const router = require("express").Router();
const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

// Add inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {

    if (req.body.quantityofBlood <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

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

      // Retrieve total in inventory of requested blood group
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

      // Calculate total in inventory
      const totalIn =
        totalInofRequestedGroup.length > 0
          ? totalInofRequestedGroup[0].total
          : 0;

      // Retrieve total out inventory of requested blood group
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

      // Calculate total out inventory
      const totalOut =
        totalOutofRequestedGroup.length > 0
          ? totalOutofRequestedGroup[0].total
          : 0;

      // Calculate available quantity of requested blood group
      const availableQuantityofRequestedGroup = totalIn - totalOut;

      if (availableQuantityofRequestedGroup < requestedQuantity) {
        throw new Error(
          `Only ${availableQuantityofRequestedGroup} units of ${requestedGroup} blood is available`
        );
      }

      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    // Add inventory
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
    // Get inventory for the organization
    const inventory = await Inventory.find({ organization: req.body.userId })
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("hospital");
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//get inventory with filter
router.post("/filter", authMiddleware, async (req, res) => {
  try {
    // Get inventory with filters
    const inventory = await Inventory.find(req.body.filters)
      .limit(req.body.limit || 10)
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("hospital")
      .populate("organization");
    return res.send({
      success: true,
      data: inventory,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Delete inventory by ID
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      throw new Error("Inventory not found");
    }

    // Delete inventory
    await inventory.deleteOne(); // Use deleteOne() method instead of delete()
    return res.send({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Update inventory by ID
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      throw new Error("Inventory not found");
    }

    // Update inventory fields
    Object.keys(req.body).forEach((key) => {
      inventory[key] = req.body[key];
    });

    await inventory.save();
    return res.send({
      success: true,
      message: "Inventory updated successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
