'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    vendorName: DataTypes.STRING,
    phone: DataTypes.STRING,
    vendorDescription: DataTypes.STRING,
    vendorType: DataTypes.INTEGER,
    vendorContactName: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Vendor.associate = function(models) {
    // associations can be defined here
  };
  return Vendor;
};