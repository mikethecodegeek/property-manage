'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Units'}
      },
      propertyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Properties'}
      },
      tenantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Tenants'}
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      depositAmnt: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable('Leases');
  }
};