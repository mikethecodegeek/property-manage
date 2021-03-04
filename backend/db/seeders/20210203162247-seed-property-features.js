"use strict";
const faker = require('faker');
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

   const features = [...Array(50)].map( prop => {
    return {
      size:faker.random.number({'min': .5,'max': 1.5}),
      numParkingSpots: faker.random.number({'min': 1,'max': 2}),
      gym: faker.random.number(1) ? true:false,
      pool: faker.random.number(1) ? true:false,
      wifi: faker.random.number(1) ? true:false,
      clubhouse: faker.random.number(1) ? true:false,
      petsAllowed: faker.random.number(1) ? true:false,
      overheadParking: faker.random.number(1) ? true:false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
    const propFeatures = []
    for (let a=1; a<=features.length-1; a++) {
      features[a].propertyId=a;
      propFeatures.push(features[a])
    }

    return queryInterface.bulkInsert(
      "PropertyFeatures",
      [
        ...propFeatures
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
   return queryInterface.bulkDelete('PropertyFeatures', null, {});
  },
};
