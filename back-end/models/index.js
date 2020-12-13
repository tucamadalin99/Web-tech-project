const Sequelize = require("sequelize");
const UserModel = require('./user');
const CategoryModel = require('./category');
const ProductModel = require('./product');
const GroupModel = require('./group');
const FriendshipModel = require('./friendship');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Group = GroupModel(db, Sequelize);
const Friendship = FriendshipModel(db, Sequelize);

User.hasMany(Product);
Product.belongsTo(User);
Category.hasMany(Product);
Product.belongsTo(Category);
User.belongsToMany(Group, {
    through: 'friendship'
})
Group.belongsToMany(User, {
    through: "friendship"
})


module.exports = {
    User,
    Product,
    Category,
    Group,
    Friendship,
    connection:db,
}