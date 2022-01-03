**(this project is currently being updated)**

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

![todologin](https://user-images.githubusercontent.com/67487694/147904599-0ff8f2c3-ae1e-42b5-ad91-f09f8bbc98af.PNG)
![todolist](https://user-images.githubusercontent.com/67487694/147904600-7c41d003-a494-4ecd-bf67-1369557f193f.PNG)


