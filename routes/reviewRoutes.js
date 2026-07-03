const express = require("express");

const {
  createReview,
  getReviewsByService,
  updateReview,
  deleteReview,
  getAverageRating,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createReview);
router.get("/average/:serviceId", getAverageRating);

router.get("/:serviceId", getReviewsByService);

router.put("/:id", protect, updateReview);

router.delete("/:id", protect, deleteReview);

module.exports = router;