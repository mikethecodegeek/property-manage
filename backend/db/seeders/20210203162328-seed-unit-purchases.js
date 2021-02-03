'use strict';

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
     return queryInterface.bulkInsert('UnitPurchases', 
       [
        {
          ownerId: 1,
          propertyId: 1,
          unitId: 1,
          description: "Heater repair",
          datePurchased: new Date(),
          vendorId: 1,
          amount: 550,
          billDueBy: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          propertyId: 1,
          unitId: 3,
          description: "New freezer",
          datePurchased: new Date(),
          vendorId: 4,
          amount: 300,
          billDueBy: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          propertyId: 2,
          unitId: 2,
          description: "Replace kitchen sink",
          datePurchased: new Date(),
          vendorId: 2,
          amount: 300,
          billDueBy: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
       ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('UnitPurchases', null, {});
  }
};
