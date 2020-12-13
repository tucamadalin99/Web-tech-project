module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "group",
        {
            groupName: DataTypes.STRING,
            groupType: DataTypes.STRING
        }
    )
}