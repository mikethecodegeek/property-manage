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
      "PropertyPurchases",
      [
        {
          ownerId: 1,
          propertyId: 1,
          description: "New fuse box",
          datePurchased: new Date(),
          vendorId: 1,
          amount: 1000,
          billDueBy: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          propertyId: 2,
          description: "Monthly Landscaping Service",
          datePurchased: new Date(),
          vendorId: 1,
          amount: 1200,
          billDueBy: new Date(),
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
    return queryInterface.bulkDelete("PropertyPurchases", null, {});
  },
};
