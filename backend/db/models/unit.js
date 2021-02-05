'use strict';
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    propertyId: DataTypes.INTEGER,
    sqft: DataTypes.INTEGER,
    isVacant: DataTypes.BOOLEAN,
    rentalPrice: DataTypes.INTEGER,
    numOccupants: DataTypes.INTEGER,
    numBeds: DataTypes.INTEGER,
    numBaths: DataTypes.INTEGER,
    unitNumber: DataTypes.INTEGER,
    unitType: DataTypes.STRING
  }, {});
  Unit.associate = function(models) {
    // associations can be defined here
    Unit.belongsTo(models.Property, {foreignKey: 'propertyId'})
    Unit.hasMany(models.Lease, {foreignKey:'unitNumber'})
    Unit.hasMany(models.Tenant, {foreignKey:'unitNumber'})
  };
  return Unit;
};