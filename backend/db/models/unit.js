'use strict';
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    propertyId: DataTypes.INTEGER,
    sqft: DataTypes.INTEGER,
    isVacant: DataTypes.BOOLEAN,
    rentalPrice: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    numOccupants: DataTypes.INTEGER,
    numBeds: DataTypes.INTEGER,
    numBaths: DataTypes.INTEGER,
    unitNumber: DataTypes.INTEGER,
    unitType: DataTypes.STRING
  }, {});
  Unit.associate = function(models) {
    // associations can be defined here
  };
  return Unit;
};