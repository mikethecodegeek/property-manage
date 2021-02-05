'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Tenant.associate = function(models) {
    // associations can be defined here
    Tenant.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Tenant;
};