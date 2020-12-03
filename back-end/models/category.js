module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "category",
        {
            name: DataTypes.STRING,
        }
    )
}