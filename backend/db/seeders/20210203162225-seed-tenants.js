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
          userId: 1,
          active:true,
          unitId: 1,
          propertyId: 1,
          unitNumber: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jane",
          lastName: "Shmoe",
          userId: 1,
          unitId: 1,
          propertyId: 1,
          unitNumber: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bill",
          lastName: "Beebop",
          userId: 1,
          unitId: 2,
          unitNumber: 2,
          propertyId: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Betty",
          lastName: "Beebop",
          userId: 1,
          unitId: 2,
          unitNumber: 2,
          propertyId: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daniel",
          lastName: "Larusso",
          userId: 1,
          unitId: 3,
          unitNumber: 3,
          propertyId: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Johnny",
          lastName: "Lawrence",
          userId: 1,
          unitId: 1,
          unitNumber: 1,
          propertyId: 2,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Eric",
          lastName: "Cartman",
          userId: 1,
          unitId: 2,
          unitNumber: 2,
          propertyId: 2,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sandy",
          lastName: "Soup",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Peter",
          lastName: "Parker",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Willy",
          lastName: "Wonka",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Charlie",
          lastName: "Cheeto",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Oscar",
          lastName: "The Grouch",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jimmy",
          lastName: "James",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Geralt",
          lastName: "Of Rivia",
          userId: 1,
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
