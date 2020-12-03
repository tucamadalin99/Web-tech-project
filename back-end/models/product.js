module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "product",
        {
            name: DataTypes.STRING,
            expireDate: DataTypes.STRING,
            brand: DataTypes.STRING,
            price: DataTypes.FLOAT,
            count: DataTypes.INTEGER
        }
    )
}