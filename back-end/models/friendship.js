module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "friendship",
        {
            groupId: DataTypes.INTEGER
        }
    )
}