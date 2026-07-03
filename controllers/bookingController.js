const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { service, address } = req.body;

    const booking = await Booking.create({
      service,
      address,
      customer: req.user.id,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.id,
    })
      .populate("service")
      .populate("customer", "name email");

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = req.body.status || booking.status;

    const updatedBooking = await booking.save();

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.customer.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
};