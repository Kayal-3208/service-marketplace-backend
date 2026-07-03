const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
console.log("Server.js loaded");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});
app.get("/hello", (req, res) => {
  res.send("HELLO WORLD");
});

const PORT = 8000;

app.get("/api/auth/test", (req, res) => {
  res.send("DIRECT TEST");
});
console.log(__filename);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});