const express = require("express");
// const { check } = require('express-validator');
const asyncHandler = require("express-async-handler");

// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {
  User,
  Property,
  Tenant,
  Unit,
  PropertyFeature,
} = require("../../db/models");

const router = express.Router();

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const {
      city,
      state,
      address,
      zipCode,
      monthlyPayment,
      propertyName,
      propertyType,
      numUnits,
      ownerId,
    } = req.body;

    const property = await Property.create({
      city,
      state,
      address,
      zipCode,
      monthlyPayment,
      propertyName,
      propertyType,
      numUnits: parseInt(numUnits),
      ownerId,
    });

    for (let a=1; a <= numUnits; a++) {
        await Unit.create({
          propertyId:property.id,
          sqft: 500,
          isVacant: true,
          rentalPrice: 1000,
          numOccupants: 1,
          numBaths: 1,
          numBeds: 1,
          unitNumber: a,
          unitType: propertyType,
          userId:ownerId
      });
    }

    return res.json({
      property,
    });
  })
);

router.post(
  "/:propertyId/photo",
  asyncHandler(async (req, res) => {
    // const propertyId = req.params
    const { imgUrl } = req.body;

    const { propertyId } = req.params;
    // console.log(req.body);
    const currentProperty = await Property.findOne({ where: { id: propertyId },include:Unit });
    console.log(currentProperty);
    
    await currentProperty.update({ photo: imgUrl });
    // currentProperty.save();
    // const properties = await Property.findAll({ where: { ownerId: 1 } });
    return res.json({
      currentProperty
    });
  })
);

router.post(
  "/:propertyId/features/new",
  asyncHandler(async (req, res) => {
    //   const propertyId = req.params
    const {
      size,
      gym,
      pool,
      wifi,
      clubhouse,
      petsAllowed,
      numParkingSpots,
      overheadParking,
    } = req.body;

    const { propertyId } = req.params;
    console.log(req.body);
    const propertyFeature = await PropertyFeature.create({
      size,
      gym,
      pool,
      wifi,
      clubhouse,
      petsAllowed,
      numParkingSpots,
      overheadParking,
      propertyId,
    });

    const properties = await Property.findAll({ where: { ownerId: 1 } });
    return res.json({
      properties,
    });
  })
);

router.get(
  "/:id/all",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const properties = await Property.findAll({
      where: { ownerId: id },
      include: [Unit, PropertyFeature],
    });
    let numEmpty = 0;
    properties.map(async (prop) => {
      const emptyUnits = await Unit.findAll({
        where: { propertyId: prop.id, isVacant: true },
      });
      let empty2 = await emptyUnits;
      prop[emptyUnits] = empty2.length;
      numEmpty += empty2.length;
      return prop;
    });
    console.log(numEmpty);
    return res.json({
      properties,
    });
  })
);

module.exports = router;
