module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "request",
        {
            requesteeId: DataTypes.INTEGER,
            requesterName: DataTypes.STRING,
            accepted: DataTypes.STRING
        }
    )
}