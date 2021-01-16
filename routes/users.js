const express = require("express");
const catchAysnc = require("../utilities/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

// ------------------------------------------------------
const router = express.Router();

// ------------------------------------------------------
router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAysnc(users.register));

// ---------------------------
router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

// ---------------------------
router.get("/logout", users.logout);

// ------------------------------------------------------
module.exports = router;
