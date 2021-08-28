const Sequelize = require('sequelize');

const db = new Sequelize("db_master","db_user","password",{
        host: "10.0.2.2",
        dialect: "mysql"
});

db.authenticate().then(() =>
        console.log("Connected to the database !")
);

module.exports = db;