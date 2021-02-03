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
      "Tenants",
      [
        {
          firstName: "Joe",
          lastName: "Shmoe",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jane",
          lastName: "Shmoe",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bill",
          lastName: "Beebop",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Betty",
          lastName: "Beebop",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daniel",
          lastName: "Larusso",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Johnny",
          lastName: "Lawrence",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Eric",
          lastName: "Cartman",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sandy",
          lastName: "Soup",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Peter",
          lastName: "Parker",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Willy",
          lastName: "Wonka",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Charlie",
          lastName: "Cheeto",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Oscar",
          lastName: "The Grouch",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jimmy",
          lastName: "James",
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Geralt",
          lastName: "Of Rivia",
          phoneNumber: "555-555-5555",
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
   return queryInterface.bulkDelete('Tenants', null, {});
  },
};
