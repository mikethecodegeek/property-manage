'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
  Tenant.associate = function(models) {
    // associations can be defined here
  };
  return Tenant;
};