const express = require('express');
// const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Property,Tenant, Unit, Lease } = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();



router.post(
    '/new',
    asyncHandler(async (req, res) => {
    //   const propertyId = req.params  
      const { 
        propertyId,
        sqft,
        isVacant,
        rentalPrice,
        numOccupants,
        numBaths,
        numBeds,
        unitNumber,
        unitType
        } = req.body;

    //   const {propertyId} = req.params 
    //   console.log(req.body)
      const unit = await Unit.create({
        propertyId,
        sqft,
        isVacant,
        rentalPrice,
        numOccupants,
        numBaths,
        numBeds,
        unitNumber,
        unitType
      });
      
    //   const properties = await Property.findAll({where:{ownerId:1}})
      return res.json({
        unit
      });
    })
  );

router.get(
  '/:propertyId/all',
  asyncHandler(async (req, res) => {
    const {propertyId} = req.params 
    const property = await Property.findOne({where:{id:propertyId}});
    const units = await Unit.findAll({
        where:{
            propertyId:property.id,
        },
    })
    
    return res.json({
       units
    });
  })
);

router.get(
    '/:propertyId/vacant',
    asyncHandler(async (req, res) => {
      const {propertyId} = req.params 
      const property = await Property.findOne({where:{id:propertyId}});
      const units = await Unit.findAll({
          where:{
              propertyId:property.id,
              isVacant: true
          },
      })
      
      return res.json({
         units
      });
    })
  );

  router.get(
    '/:propertyId/rented',
    asyncHandler(async (req, res) => {
      const {propertyId} = req.params 
      const property = await Property.findOne({where:{id:propertyId}});
      const units = await Unit.findAll({
          where:{
              propertyId:property.id,
              isVacant: false
          },
      })
      
      return res.json({
         units
      });
    })
  );

module.exports = router;