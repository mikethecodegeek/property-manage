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
      "Vendors",
      [
        {
          vendorName: "Bills Electric",
          phone: "555-555-5555",
          vendorDescription:'Local Electrician',
          vendorType: 1,
          vendorContactName: 'Bill',
          city: 'Las Vegas',
          state: 'Nevada',
          address: '1 Industrial Rd',
          zipCode:'43256',
          email: 'billelectric@aol.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vendorName: "John's Plumbing",
          phone: "555-555-7777",
          vendorDescription:'Local Plumber',
          vendorType: 1,
          vendorContactName: 'John',
          city: 'Las Vegas',
          state: 'Nevada',
          address: '5 Industrial Rd',
          zipCode:'43256',
          email: 'jplumbdog@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vendorName: "Larry The Landscaper",
          phone: "555-555-1111",
          vendorDescription:'Local Landscaper',
          vendorType: 1,
          vendorContactName: 'Sue',
          city: 'Las Vegas',
          state: 'Nevada',
          address: '8 Industrial Rd',
          zipCode:'43256',
          email: 'trimthatgrass@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vendorName: "Home Depot",
          phone: "555-555-9999",
          vendorDescription:'Retail store for supplies',
          vendorType: 2,
          vendorContactName: 'N/A',
          city: 'Las Vegas',
          state: 'Nevada',
          address: '10 Industrial Rd',
          zipCode:'43256',
          email: 'N/A',
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
    return queryInterface.bulkDelete("Vendors", null, {});
  },
};
