const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");

//get all blood groups totalIn, totalOut, available data from inventory
router.get("/blood-groups-data", authmiddleware, async (req, res) => {
  try {
    const allBloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    const bloodGroupsData = [];

    await Promise.all(
      allBloodGroups.map(async (bloodGroup) => {
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantityofBlood" },
            },
          },
        ]);

        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantityofBlood" },
            },
          },
        ]);

        const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
        bloodGroupsData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          available,
        });
      })
    );

    res.send({
      success: true,
      message: "Blood Groups Data",
      data: bloodGroupsData,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
