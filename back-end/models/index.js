const Sequelize = require("sequelize");
const UserModel = require('./user');
const CategoryModel = require('./category');
const ProductModel = require('./product');
const GroupModel = require('./group');
const FriendshipModel = require('./friendship');
const RequestModel = require('./request');
const FriendModel = require('./friend');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Group = GroupModel(db, Sequelize);
const Friendship = FriendshipModel(db, Sequelize);
const Friend = FriendModel(db, Sequelize);
const Request = RequestModel(db, Sequelize);

User.hasMany(Request);
Request.belongsTo(User);
User.hasMany(Product);
Product.belongsTo(User);
Category.hasMany(Product);
Product.belongsTo(Category); 
User.belongsToMany(Group, {
    through: 'friendship',
})
Group.belongsToMany(User, {
    through: "friendship",
})

User.belongsToMany(Friend, {
    through: 'friendship',
   
})

Friend.belongsToMany(User, {
    through: 'friendship',
    
})



module.exports = {
    User,
    Product,
    Category,
    Group,
    Friendship,
    Request,
    Friend,
    connection:db,
}