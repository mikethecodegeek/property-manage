'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      propertyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Properties'}
      },
      sqft: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:0
        
      },
      isVacant: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      rentalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      numOccupants: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      numBeds: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      numBaths: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      unitNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      unitType: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Units');
  }
};