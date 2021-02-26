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
          firstName: "Daniel",
          lastName: "Larusso",
          userId: 1,
          unitId: 1,
          unitNumber: 1,
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
          unitId: 2,
          unitNumber: 2,
          propertyId: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Eric",
          lastName: "Cartman",
          userId: 1,
          unitId: 3,
          unitNumber: 3,
          propertyId: 2,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Peter",
          lastName: "Parker",
          userId: 1,
          unitId: 4,
          unitNumber: 4,
          propertyId: 1,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Willy",
          lastName: "Wonka",
          userId: 1,
          unitId: 5,
          unitNumber: 1,
          propertyId: 2,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Chester",
          lastName: "Cheetah",
          userId: 1,
          unitId: 6,
          unitNumber: 2,
          propertyId: 2,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
       
        {
          firstName: "Jimmy",
          lastName: "James",
          userId: 1,
          unitId: 7,
          unitNumber: 1,
          propertyId: 3,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "George",
          lastName: "Castanza",
          userId: 1,
          unitId: 8,
          unitNumber: 2,
          propertyId: 3,
          active:true,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Stewie",
          lastName: "Griffin",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bugs",
          lastName: "Bunny",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Homer",
          lastName: "Simpson",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Morty",
          lastName: "Smith",
          userId: 1,
          phoneNumber: "555-555-5555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Tina",
          lastName: "Belcher",
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
