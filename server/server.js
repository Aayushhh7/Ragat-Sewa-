const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// Create express app
const app = express();

// Dot config
dotenv.config();

// MongoDB connection
connectDB();

// Middlewares
app.use(express.json());

const userRoute = require("./routes/userRoute");

// Routes
app.use("/api/users", userRoute);

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on Port ${PORT}`
      .bgBlue.white
  );
});
