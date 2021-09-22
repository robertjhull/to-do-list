**This project is being updated right now and will not work correctly**

# About

A web application for creating to-do lists and reminders. Reminders can contain the following info: text, priority, and date added. To mark a reminder as completed, check the box on the left side of the reminder.

**Tech**: React, Node, Express, MySQL, Sequelize

# Install

After cloning the repository, update db.js to connect with your local MySQL set up. The [Sequelize documentation](https://sequelize.org/master/manual/getting-started.html) can help with this.

Create a .env file in the server directory and add your session secret (this can be any string) along with MySQL connection info:

```
DB_NAME = 'database name goes here'
DB_USER = 'username'
DB_PASSWORD = 'password'
SESSION_SECRET = 'your session secret'
```

Navigate to server folder then install dependencies and seed database:

```
cd server
npm install
npm run seed
```

Then install dependencies for the client:

```
cd client
npm install
```

Start the server:

```
cd server
npm run dev
```

Start the client:

```
cd client
npm start
```
