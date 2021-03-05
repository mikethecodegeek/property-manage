'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UnitPurchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      propertyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Properties'}
      },
      unitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Units'}
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      datePurchased: {
        allowNull: false,
        type: Sequelize.DATE
      },
      vendorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Vendors'}
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      billDueBy: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('UnitPurchases');
  }
};