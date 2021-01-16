module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "friendship",
        {
            userId: DataTypes.INTEGER,
            friendId: DataTypes.INTEGER
        }
    )
}