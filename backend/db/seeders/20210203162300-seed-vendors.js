"use strict";
const faker=require('faker');
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
   const vendors = [...Array(25)].map( prop => {
    return {
      vendorName: faker.company.companyName(),
      userId: 1,
      phone: faker.phone.phoneNumberFormat(3),
      vendorDescription:faker.lorem.paragraph(3),
      vendorType: faker.random.number(1) ? 1:2,
      vendorContactName: faker.name.firstName(),
      city: faker.address.city(),
      state: faker.address.state(),
      address: faker.address.streetAddress(),
      zipCode:faker.address.zipCode(),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
    return queryInterface.bulkInsert(
      "Vendors",
      [
       ...vendors
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
    return queryInterface.bulkDelete("Vendors", null, {});
  },
};
