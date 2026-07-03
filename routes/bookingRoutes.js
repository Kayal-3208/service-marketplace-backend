const express = require("express");

const {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createBooking);

router.get("/mybookings", protect, getMyBookings);

router.put("/:id", protect, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;