const express = require('express');
// const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Property,Tenant, Unit, Lease } = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();


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