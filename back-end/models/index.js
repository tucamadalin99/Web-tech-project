const Sequelize = require("sequelize");
const UserModel = require('./user');
const db = require('../config/db');

const User = UserModel(db, Sequelize);

module.exports = {
    User,
    connection:db,
}