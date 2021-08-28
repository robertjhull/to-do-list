const Sequelize = require("sequelize");
const db = require("../db");

const Reminder = db.define("reminder", {
  title: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    unique: false,
    alloWNull: true,
  },
  priority: {
    type: Sequelize.INTEGER,
    allowNull: true,
    },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Reminder;