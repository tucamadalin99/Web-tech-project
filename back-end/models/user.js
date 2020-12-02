const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            address: DataTypes.STRING,
            type: DataTypes.STRING
        }
    )
}