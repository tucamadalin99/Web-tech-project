const Sequelize = require('sequelize');

const sequelize = new Sequelize("food_waste_db", "root", "", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: true,
    }
})

module.exports = sequelize;