const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");
const {
  loginUser,
  logoutUser
} = require("../../controllers/auth");

router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;