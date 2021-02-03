'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lease = sequelize.define('Lease', {
    unitId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    tenantId: DataTypes.INTEGER,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
    depositAmnt: DataTypes.INTEGER
  }, {});
  Lease.associate = function(models) {
    // associations can be defined here
  };
  return Lease;
};