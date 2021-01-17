module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "product",
        {
            name: DataTypes.STRING,
            expireDate: DataTypes.STRING,
            expireSoon: DataTypes.BOOLEAN,
            brand: DataTypes.STRING,
            price: DataTypes.FLOAT,
            count: DataTypes.INTEGER,
            status:DataTypes.STRING
        }
    )
}