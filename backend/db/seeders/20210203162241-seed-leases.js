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
   let tenantNum=1, unitId=1, leases=[]
   for (let a= 1; a<=25; a++) {
     for (let b=1; b<=4; b++) {
       leases.push({
        unitId: unitId,
        userId: 1,
        propertyId: a,
        unitNumber: b,
        tenantId: tenantNum,
        depositAmnt: faker.random.number({'min': 700,'max': 1200}),
        startDate: faker.date.between('1-1-2019', new Date()),
        endDate: faker.date.between(new Date(), '1-1-2023'),
        createdAt: new Date(),
        updatedAt: new Date(),
       })
       tenantNum++
       unitId++

     }
   }

   for (let a= 26; a<=40; a++) {
    for (let b=1; b<=2; b++) {
      leases.push({
       unitId: unitId,
       userId: 1,
       propertyId: a,
       unitNumber: b,
       tenantId: tenantNum,
       depositAmnt: faker.random.number({'min': 700,'max': 1200}),
       startDate: faker.date.between('1-1-2019', new Date()),
       endDate: faker.date.between(new Date(), '1-1-2023'),
       createdAt: new Date(),
       updatedAt: new Date(),
      })
      tenantNum++
      unitId++

    }
  }

    return queryInterface.bulkInsert(
      "Leases",
      [
       ...leases
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
   return queryInterface.bulkDelete('Leases', null, {});
  },
};
