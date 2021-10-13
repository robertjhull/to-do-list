const User = require("../db/models/User");
const Reminder = require("../db/models/Reminder");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.correctPassword(password))) {
    const reminders = await Reminder.findAll({ userId: user._id });

    const token = generateToken(user._id);
    const secondsInWeek = 604800;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          reminders: reminders,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.send("You have successfully logged out");
});