const Reminder = require("./reminder");
const User = require("./user");

// associations
User.hasMany(Reminder);
Reminder.belongsTo(User, { as: "user" });

module.exports = {
  User,
  Reminder
};