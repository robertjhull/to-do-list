const router = require("express").Router();
const { User, Reminder } = require("../../db/models");

// expects { title, date?, priority? } in body
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
      }

    const user = await User.findOne({ where: { id: req.user.id } });
    
    if (user) {
      const { title, date, priority } = req.body;
      const userId = user.id;
      const message = await Message.create({ title, date, priority, userId });
      return res.json({ message });
    }

  } catch (error) {
    next(error);
  }
});

// expects { reminderId, userID, title?, date?, priority?, completed? } in body
router.patch("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const reminder = await Reminder.findOne({ where: { id: req.params.id } });
    
    if (reminder.userId !== req.user.id) {
      console.log("userId does not match");
      return res.sendStatus(401);
    }

    const { title, date, priority, completed } = req.body;

    if (title) {
      reminder.title = title;
    }

    if (date) {
      reminder.date = date;
    }

    if (priority) {
      reminder.priority = priority;
    }

    if (completed) {
      reminder.completed = completed;
    }

    await reminder.save();
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// expects { reminderId } from req.body
router.delete('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { reminderId } = req.body;

    const destroyed = await reminder.destroy({ where: { id: reminderId, userId: req.user.id } });

    if (destroyed) {
      return res.sendStatus(204);
    } else {
      console.log("no reminder with that ID was found");
      return res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;