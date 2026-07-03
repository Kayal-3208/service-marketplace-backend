const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { service, rating, comment } = req.body;

    const review = await Review.create({
      service,
      customer: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getReviewsByService = async (req, res) => {
  try {
    const reviews = await Review.find({
      service: req.params.serviceId,
    }).populate("customer", "name");

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.customer.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.customer.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAverageRating = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $match: {
          service: new require("mongoose").Types.ObjectId(req.params.serviceId),
        },
      },
      {
        $group: {
          _id: "$service",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    res.status(200).json(result[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createReview,
  getReviewsByService,
  updateReview,
  deleteReview,
  getAverageRating,
};