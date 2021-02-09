'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    unitNumber: DataTypes.INTEGER,
    unitId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
  }, {});
  Tenant.associate = function(models) {
    // associations can be defined here
    Tenant.belongsTo(models.User, {foreignKey: 'userId'})
    Tenant.belongsTo(models.Property, {foreignKey: 'propertyId'})
    Tenant.belongsTo(models.Unit, {foreignKey: 'unitId'})
  };
  return Tenant;
};