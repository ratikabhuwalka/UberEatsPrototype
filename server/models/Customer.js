module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer",{
        custId : {
            type: DataTypes.STRING,
    
        }

    })
}