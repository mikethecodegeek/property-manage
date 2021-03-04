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
    const props = [...Array(25)].map( prop => {
      return {
        city: faker.address.city(),
        state: faker.address.state(),
        address: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        ownerId: 1,
        monthlyPayment: faker.random.number({'min': 2000,'max': 2500}),
        propertyName: faker.random.words(2),
        propertyType:'Apartment',
        numUnits: 4,
        photo:faker.image.business(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    const props2 = [...Array(25)].map( prop => {
      return {
        city: faker.address.city(),
        state: faker.address.state(),
        address: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        ownerId: 1,
        monthlyPayment: faker.random.number({'min': 800,'max': 1500}),
        propertyName: faker.random.words(2),
        propertyType:'Apartment',
        numUnits: 2,
        photo:faker.image.business(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    

    const allProps = [...props,...props2]
    // console.log(allProps)
    const allUnits= []
    let countUnits = 0
    for (let a=0; a<allProps.length; a++) {
      // console.log(allProps[a].numUnits)
      let vacant
      for (let b=1; b<=allProps[a].numUnits; b++) {
        countUnits++;
       countUnits>130 ? vacant= true :vacant= false 
       allUnits.push({
          userId: 1,
          propertyId: a+1,
          sqft: faker.random.number({'min': 700,'max': 1500}),
          rentalPrice: faker.random.number({'min': 800,'max': 1200}),
          unitNumber:b,
          isVacant: vacant,
          unitType: 'Apartment',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        // console.log(allUnits)
      }
    }

    return (queryInterface.bulkInsert(
      "Properties",
      [
       ...allProps,
      ],
      {}
    ), queryInterface.bulkInsert(
      "Units",
      [
        ...allUnits
      ]
    ));
      // "Units",[
      //    {
      //     userId: 1,
      //     propertyId: 1,
      //     sqft: 900,
      //     rentalPrice: 1000,
      //     unitNumber:1,
      //     isVacant: false,
      //     unitType: 'Apartment',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      // ],
      // "Units",
      // [...allUnits],
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Properties", null, {});
  },
};
