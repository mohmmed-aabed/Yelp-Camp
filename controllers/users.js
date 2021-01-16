const User = require("../models/user");

// ------------------------------------------------------
module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

// ------------------------------------------------------
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

// ------------------------------------------------------
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// ------------------------------------------------------
module.exports.login = (req, res) => {
  const redirectUrl = req.session.returnTo || "/campgrounds";
  req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
};

// ------------------------------------------------------
module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
