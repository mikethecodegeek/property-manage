const express = require('express');
const asyncHandler = require('express-async-handler');

const { User,Property,Tenant, Unit, Lease, UnitPurchases ,PropertyPurchases} = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();


router.get(
  '/:userId/all',
  asyncHandler(async (req, res) => {
    const {userId} = req.params 
    const unitPurchases = await UnitPurchases.findAll({where:{ownerId:userId}});
    const propertyPurchases = await PropertyPurchases.findAll({where:{ownerId:userId}});
    const allPurchases = {unitPurchases,propertyPurchases}
      
    return res.json({
       allPurchases
    });
  })
);

module.exports = router;