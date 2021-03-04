"use strict";
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

   const purchases = [...Array(50)].map( prop => {
    return {
      ownerId: 1,
      propertyId: faker.random.number({'min':1, 'max':50}),
      description: faker.lorem.sentence(30),
      datePurchased: faker.date.between('1-1-2021', '1-4-2021'),
      vendorId: faker.random.number({'min':1,'max':25}),
      amount: faker.random.number({'min':300,'max':1200}),
      billDueBy: faker.date.between(new Date(), '1-4-2021'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  console.log(purchases)

    return queryInterface.bulkInsert(
      "PropertyPurchases",
      [
       ...purchases
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
