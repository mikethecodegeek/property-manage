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
        unitNumber,
        userId
        } = req.body;
 

      const lease = await Lease.create({
        propertyId:parseInt(propertyId),
        unitId:parseInt(unitId),
        tenantId:parseInt(tenantId),
        userId:parseInt(userId),
        startDate,
        endDate,
        depositAmnt,
        unitNumber:parseInt(unitNumber)
       
      });

      const currentUnit = await Unit.findOne({where: {
          unitNumber:unitNumber,
          propertyId:propertyId
      }})

    //   console.log(currentUnit)
      currentUnit.set({isVacant:false})
      currentUnit.save()

      currentTenant = await Tenant.findOne({where:{id:tenantId}})
      currentTenant.set({active:true,propertyId:propertyId,unitId:unitId,unitNumber:unitNumber})
      currentTenant.save()

      const currentLease = await Lease.findOne({
        where: {id:lease.id},
        include: [{model:Property,attributes:['propertyName']}, {model:Tenant,attributes:['firstName','lastName']},{model:Unit,attributes:['rentalPrice']}]
     })

     console.log(currentLease)
      
    //   const properties = await Property.findAll({where:{ownerId:1}})
      return res.json({
        currentLease
      });
    })
  );

  router.post(
    '/delete',
    asyncHandler(async (req, res) => {
    //   const propertyId = req.params  
      const { 
        leaseId
        } = req.body;
 
      console.log('HIIIIIITTTTTTTT')
      const lease = await Lease.findOne({where:{id:leaseId}})

      const currentUnit = await Unit.findOne({where: {
          unitNumber:lease.unitNumber,
          propertyId:lease.propertyId
      }})

    //   console.log(currentUnit)
      currentUnit.set({isVacant:true})
      currentUnit.save()

      currentTenant = await Tenant.findOne({where:{id:lease.tenantId}})
      currentTenant.set({active:null,propertyId:null,unitId:null,unitNumber:null})
      currentTenant.save()

      lease.destroy()
      
    //   const properties = await Property.findAll({where:{ownerId:1}})
      return res.json({
        lease
      });
    })
  );



router.get(
  '/:userId/all',
  asyncHandler(async (req, res) => {
    const {userId} = req.params 
    // const property = await Property.findOne({where:{userId:propertyId}});
    // const units = await Unit.findAll({
    //     where:{
    //         userId: userId,
    //         propertyId:property.id,
    //         isVacant: false
    //     },
    // })
    
    const leases = await Lease.findAll({
            where: {userId},
            include: [{model:Property,attributes:['propertyName']}, {model:Tenant,attributes:['firstName','lastName']},{model:Unit,attributes:['rentalPrice']}]
         })
   
      
    return res.json({
       leases
    });
  })
);

router.get(
  '/:userId/:propertyId/all',
  asyncHandler(async (req, res) => {
    const {userId,propertyId} = req.params 
    const property = await Property.findOne({where:{id:propertyId}});
    const units = await Unit.findAll({
        where:{
            userId: userId,
            propertyId:property.id,
            isVacant: false
        },
    })
    
    const leases = await Promise.all(units.map((unit) => {
        // console.log(unit.unitNumber)
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