const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Create express app
const app = express();

// Dot config
dotenv.config();

// MongoDB connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/userRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const eventRoute = require("./routes/eventRoute");
const bloodDonationRequestRoutes = require("./routes/bloodDonationRequestRoutes")

// Routes
app.use("/api/users", userRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/events", eventRoute);
app.use("/api/emailBoardcasting", bloodDonationRequestRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on Port ${PORT}`.bgBlue
      .white
  );
});
