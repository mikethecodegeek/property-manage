"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Units",
      [
        {
          propertyId: 1,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:1,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 1,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:2,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 1,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:3,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 1,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:4,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 1,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:5,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 1,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:6,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:1,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:2,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 900,
          rentalPrice: 2000,
          unitNumber:3,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:4,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:5,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          propertyId: 2,
          sqft: 1200,
          rentalPrice: 2500,
          unitNumber:6,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Units', null, {});
  },
};
