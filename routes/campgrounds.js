const express = require("express");
const catchAysnc = require("../utilities/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const {
  validateCampground,
  isLoggedIn,
  isAuthorized,
} = require("../middleware");

// ------------------------------------------------------
const router = express.Router();

// ------------------------------------------------------
router
  .route("/")
  .get(catchAysnc(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAysnc(campgrounds.createCampground)
  );

// ---------------------------
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// ---------------------------
router
  .route("/:id")
  .get(catchAysnc(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthorized,
    upload.array("image"),
    validateCampground,
    catchAysnc(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthorized, catchAysnc(campgrounds.deleteCampground));

// ---------------------------
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthorized,
  catchAysnc(campgrounds.renderEditForm)
);

// ------------------------------------------------------
module.exports = router;
