'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnitPhoto = sequelize.define('UnitPhoto', {
    unitId: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {});
  UnitPhoto.associate = function(models) {
    // associations can be defined here
  };
  return UnitPhoto;
};