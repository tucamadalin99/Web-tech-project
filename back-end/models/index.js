const Sequelize = require("sequelize");
const UserModel = require('./user');
const CategoryModel = require('./category');
const ProductModel = require('./product');
const GroupModel = require('./group');
const FriendshipModel = require('./friendship');
const FriendModel = require('./friend');
const GroupshipModel = require('./groupship');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Group = GroupModel(db, Sequelize);
const Friendship = FriendshipModel(db, Sequelize);
const Friend = FriendModel(db, Sequelize);
const Groupship = GroupshipModel(db, Sequelize);

User.hasMany(Product);
Product.belongsTo(User);
Category.hasMany(Product);
Product.belongsTo(Category); 

User.belongsToMany(Group, {
    through: 'groupship',
})
Group.belongsToMany(User, {
    through: "groupship",
})

User.belongsToMany(Friend, {
    through: 'friendship',
    foreignKey: 'userId'
})

Friend.belongsToMany(User, {
    through: 'friendship',
    foreignKey: 'friendId'
})



module.exports = {
    User,
    Product,
    Category,
    Group,
    Friendship,
    Groupship,
    Friend,
    connection:db,
}