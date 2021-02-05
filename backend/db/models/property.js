'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    pricePaid: DataTypes.INTEGER,
    amountOwed: DataTypes.INTEGER,
    monthlyPayment: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    propertyName: DataTypes.STRING,
    propertyType: DataTypes.STRING,
    numUnits: DataTypes.INTEGER
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
    Property.hasMany(models.Unit, {foreignKey: 'propertyId'})
    Property.hasMany(models.Tenant, {foreignKey: 'propertyId'})
    Property.hasOne(models.PropertyFeature, {foreignKey: 'propertyId'})
  };
  return Property;
};