const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleWare");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// Add Inventory || POST
router.post("/create-inventory", authMiddleWare, createInventoryController);

//Get all Blood Records
router.get("/get-inventory", authMiddleWare, getInventoryController);

module.exports = router;
