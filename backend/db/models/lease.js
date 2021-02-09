'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lease = sequelize.define('Lease', {
    unitNumber: DataTypes.INTEGER,
    unitId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
    depositAmnt: DataTypes.INTEGER
  }, {});
  Lease.associate = function(models) {
    // associations can be defined here
    Lease.belongsTo(models.Unit, {foreignKey:'unitNumber'})
    Lease.belongsTo(models.Property, {foreignKey:'propertyId'})
  };
  return Lease;
};