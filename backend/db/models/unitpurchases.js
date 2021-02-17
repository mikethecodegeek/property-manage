'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnitPurchases = sequelize.define('UnitPurchases', {
    ownerId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    unitId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    datePurchased: DataTypes.INTEGER,
    vendorId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    billDueBy: DataTypes.INTEGER
  }, {});
  UnitPurchases.associate = function(models) {
    // associations can be defined here
    UnitPurchases.belongsTo(models.Vendor, {foreignKey:'vendorId'})
  };
  return UnitPurchases;
};