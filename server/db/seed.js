const db = require("./db");
const { User, Reminder } = require("./models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const demo = await User.create({
    username: "demo",
    email: "demo@demo.com",
    password: "password123",
  });

  await Reminder.create({
    title: "Buy groceries",
    date: new Date().toISOString(),
    priority: 3,
    completed: false,
    userId: demo.id,
  });
  await Reminder.create({
    title: "Go to the gym",
    date: new Date().toISOString(),
    priority: 1,
    completed: false,
    userId: demo.id,
  });
  await Reminder.create({
    title: "Make dentist appointment",
    date: new Date().toISOString(),
    priority: 1,
    completed: false,
    userId: demo.id,
  });
  await Reminder.create({
    title: "Buy more dog food",
    date: new Date().toISOString(),
    priority: 2,
    completed: true,
    userId: demo.id,
  });

  console.log(`seeded demo user and reminders`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}