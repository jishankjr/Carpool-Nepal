require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const rideRoutes = require("./routes/rideRoutes");
const rideRequestRoutes = require("./routes/rideRequestRoutes");
const walletRoutes = require("./routes/walletRoutes");

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/ride", rideRoutes);
app.use("/ride-request", rideRequestRoutes);
app.use("/wallet", walletRoutes);

module.exports = app;