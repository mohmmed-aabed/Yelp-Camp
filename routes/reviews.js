const express = require("express");
const catchAysnc = require("../utilities/catchAsync");
const reviews = require("../controllers/reviews");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthorized,
} = require("../middleware");

// ------------------------------------------------------
const router = express.Router({ mergeParams: true });

// ------------------------------------------------------
router.post("/", isLoggedIn, validateReview, catchAysnc(reviews.createReview));

// ---------------------------
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthorized,
  catchAysnc(reviews.deleteReview)
);

// ------------------------------------------------------
module.exports = router;
