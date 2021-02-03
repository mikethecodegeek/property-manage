'use strict';
module.exports = (sequelize, DataTypes) => {
  const VendorType = sequelize.define('VendorType', {
    description: DataTypes.STRING
  }, {});
  VendorType.associate = function(models) {
    // associations can be defined here
  };
  return VendorType;
};