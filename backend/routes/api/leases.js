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
        unitId,
        tenantId,
        startDate,
        endDate,
        depositAmnt,
        unitNumber
        } = req.body;
 

      const lease = await Lease.create({
        propertyId:parseInt(propertyId),
        unitId:parseInt(unitId),
        tenantId:parseInt(tenantId),
        startDate,
        endDate,
        depositAmnt,
        unitNumber:parseInt(unitNumber)
       
      });

      const currentUnit = await Unit.findOne({where: {
          unitNumber:unitNumber,
          propertyId:propertyId
      }})

      console.log(currentUnit)
      currentUnit.set({isVacant:false})
      currentUnit.save()

      currentTenant = await Tenant.findOne({where:{id:tenantId}})
      currentTenant.set({status:'Active Tenant',propertyId:propertyId,unitId:unitId,unitNumber:unitNumber})
      currentTenant.save()
      
    //   const properties = await Property.findAll({where:{ownerId:1}})
      return res.json({
        lease
      });
    })
  );


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
    
    const leases = await Promise.all(units.map((unit) => {
        console.log(unit.unitNumber)
        return Lease.findAll({
            where: {
            propertyId: propertyId,
            unitId: unit.unitNumber
            },
            include: Unit
         })
    }))
      
    return res.json({
       leases
    });
  })
);

module.exports = router;