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
   const tenants = [...Array(500)].map( prop => {
    return {
      firstName: faker.address.city(),
      lastName: faker.address.state(),
      userId:1,
      phoneNumber: faker.phone.phoneNumberFormat(3),
      createdAt: faker.date.between('1-1-2019', new Date()),
      updatedAt: new Date(),
    }
  })

    let tenantNum=0, unitId=1
    for (let a= 1; a<=25; a++) {
      for (let b=1; b<=4; b++) {
        tenants[tenantNum].propertyId = a;
        tenants[tenantNum].unitId = unitId;
        tenants[tenantNum].unitNumber = b;
        tenants[tenantNum].active = true;
        tenantNum++
        unitId++
      }
    }

    for (let a= 26; a<=40; a++) {
      for (let b=1; b<=2; b++) {
        tenants[tenantNum].propertyId = a;
        tenants[tenantNum].unitId = unitId;
        tenants[tenantNum].unitNumber = b;
        tenants[tenantNum].active = true;
        tenantNum++
        unitId++
      }
    }



    return queryInterface.bulkInsert(
      "Tenants",
      [
        ...tenants
        // {
        //   firstName: "Daniel",
        //   lastName: "Larusso",
        //   userId: 1,
        //   unitId: 1,
        //   unitNumber: 1,
        //   propertyId: 1,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Johnny",
        //   lastName: "Lawrence",
        //   userId: 1,
        //   unitId: 2,
        //   unitNumber: 2,
        //   propertyId: 1,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Eric",
        //   lastName: "Cartman",
        //   userId: 1,
        //   unitId: 3,
        //   unitNumber: 3,
        //   propertyId: 2,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Peter",
        //   lastName: "Parker",
        //   userId: 1,
        //   unitId: 4,
        //   unitNumber: 4,
        //   propertyId: 1,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Willy",
        //   lastName: "Wonka",
        //   userId: 1,
        //   unitId: 5,
        //   unitNumber: 1,
        //   propertyId: 2,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Chester",
        //   lastName: "Cheetah",
        //   userId: 1,
        //   unitId: 6,
        //   unitNumber: 2,
        //   propertyId: 2,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
       
        // {
        //   firstName: "Jimmy",
        //   lastName: "James",
        //   userId: 1,
        //   unitId: 7,
        //   unitNumber: 1,
        //   propertyId: 3,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "George",
        //   lastName: "Castanza",
        //   userId: 1,
        //   unitId: 8,
        //   unitNumber: 2,
        //   propertyId: 3,
        //   active:true,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Stewie",
        //   lastName: "Griffin",
        //   userId: 1,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Bugs",
        //   lastName: "Bunny",
        //   userId: 1,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Homer",
        //   lastName: "Simpson",
        //   userId: 1,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Morty",
        //   lastName: "Smith",
        //   userId: 1,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   firstName: "Tina",
        //   lastName: "Belcher",
        //   userId: 1,
        //   phoneNumber: "555-555-5555",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
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
