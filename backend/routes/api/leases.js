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
    const {userId,propertyId} = req.params 
    const property = await Property.findOne({where:{id:propertyId}});
    const units = await Unit.findAll({
        where:{
            propertyId:property.id,
            isVacant: false
        },
    })
 
    const leases = await units.map(async unit => {
        const currentLease = await Lease.findAll({
            where: {
            propertyId: propertyId,
            unitId: unit.id
            }
         })
         console.log(await currentLease)
         return await currentLease
    })
   
    // console.log(leases)
    return res.json({
       leases
    });
  })
);

module.exports = router;