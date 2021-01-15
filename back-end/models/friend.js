module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "friend",
        {
            name: DataTypes.STRING,
            userId: DataTypes.INTEGER
        }
    )
}