'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PropertyFeatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gym: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      propertyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Properties'}
      },
      clubhouse: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      petsAllowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      numParkingSpots: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      overheadParking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PropertyFeatures');
  }
};