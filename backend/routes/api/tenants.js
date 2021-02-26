const express = require('express');
const asyncHandler = require('express-async-handler');
const { User,Property,Tenant, Unit, Lease } = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();


router.post(
    '/new',
    asyncHandler(async (req, res) => {
      const { 
        firstName,
        lastName,
        phoneNumber,
        userId
        } = req.body;
       
      const tenant = await Tenant.create({
        firstName,
        lastName,
        phoneNumber,
        userId
      });
      
  
      return res.json({
        tenant
      });
    })
  );

router.post(
    '/remove',
    asyncHandler(async (req, res) => {
      const { 
         id
        } = req.body;
       
      const tenant = await Tenant.findOne({where: id})
      tenant.destroy()
  
      return res.json({
        tenant
      });
    })
  );

router.get(
  '/:userId/all',
  asyncHandler(async (req, res) => {
    const {userId} = req.params 
    const tenants = await Tenant.findAll({where:{userId:userId}});
    // console.log(tenants)
    // const units = await Unit.findAll({
    //     where:{
    //         propertyId:property.id,
    //     },
    // })
    
    return res.json({
       tenants
    });
  })
);





module.exports = router;