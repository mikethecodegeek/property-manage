'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyFeature = sequelize.define('PropertyFeature', {
    size: DataTypes.INTEGER,
    gym: DataTypes.BOOLEAN,
    pool: DataTypes.BOOLEAN,
    wifi: DataTypes.BOOLEAN,
    propertyId: DataTypes.INTEGER,
    clubhouse: DataTypes.BOOLEAN,
    petsAllowed: DataTypes.BOOLEAN,
    numParkingSpots: DataTypes.INTEGER,
    overheadParking: DataTypes.BOOLEAN
  }, {});
  PropertyFeature.associate = function(models) {
    // associations can be defined here
  };
  return PropertyFeature;
};