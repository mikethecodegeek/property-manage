'use strict';
const faker=require('faker')
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
   const purchases = [...Array(20)].map( prop => {
    return {
      ownerId: 1,
      propertyId: faker.random.number({'min':1, 'max':50}),
      unitId: faker.random.number({'min':1,'max': 147}),
      description: faker.lorem.sentence(30),
      datePurchased: faker.date.between('1-1-2021', '1-4-2021'),
      vendorId: 1,
      amount: faker.random.number({'min':300,'max':600}),
      billDueBy: faker.date.between(new Date(), '1-4-2021'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
     return queryInterface.bulkInsert('UnitPurchases', 
       [
        ...purchases
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
