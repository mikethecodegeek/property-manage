const express = require('express');
// const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Property,Tenant, Unit, Lease } = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();


router.get(
  '/tenants/:userId/all',
  asyncHandler(async (req, res) => {
    // const {propertyId} = req.params 
    const tenants = await Tenant.findAll({where:{userId:id}});
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