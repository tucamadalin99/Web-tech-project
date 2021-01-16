module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "friend",
        {
            status: DataTypes.STRING,
            name: DataTypes.STRING,
            type: DataTypes.STRING
        }
    )
}