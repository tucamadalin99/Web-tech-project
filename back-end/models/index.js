const Sequelize = require("sequelize");
const UserModel = require('./user');
const CategoryModel = require('./category');
const ProductModel = require('./product');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);

User.hasMany(Product);
Category.hasMany(Product);


module.exports = {
    User,
    Product,
    Category,
    connection:db,
}