'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      pricePaid: {
        type: Sequelize.FLOAT
      },
      amountOwed: {
        type: Sequelize.FLOAT
      },
      monthlyPayment: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      photo: {
        type: Sequelize.TEXT
      },
      propertyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      propertyType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numUnits: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Properties');
  }
};