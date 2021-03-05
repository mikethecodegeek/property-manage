'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyPurchases = sequelize.define('PropertyPurchases', {
    ownerId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    datePurchased: DataTypes.INTEGER,
    vendorId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    billDueBy: DataTypes.INTEGER
  }, {});
  PropertyPurchases.associate = function(models) {
    // associations can be defined here
    PropertyPurchases.belongsTo(models.Vendor, {foreignKey:'vendorId'})
  };
  return PropertyPurchases;
};