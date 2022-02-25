const sequelize = require('sequelize')

const db = new sequelize('serikat-db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db