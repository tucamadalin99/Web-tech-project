module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "friend",
        {
            to: DataTypes.STRING,
            from: DataTypes.STRING,
            type: DataTypes.STRING
        }
    )
}