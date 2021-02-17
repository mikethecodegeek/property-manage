const express = require('express');
const asyncHandler = require('express-async-handler');

const { User,Property,Tenant, Unit, Lease, UnitPurchases ,PropertyPurchases, Vendor} = require('../../db/models');
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

router.get(
  '/property/:propertyId/all',
  asyncHandler(async (req, res) => {
    const {propertyId} = req.params 
    const propertyPurchases = await PropertyPurchases.findAll({where:{propertyId:propertyId},include: Vendor});
    const unitPurchases = await UnitPurchases.findAll({where:{propertyId:propertyId}, include: Vendor});
    const allPurchases = {unitPurchases,propertyPurchases}   
    return res.json({
       allPurchases
    });
  })
);

router.get(
  '/:propertyId/:unitId/all',
  asyncHandler(async (req, res) => {
    const {propertyId,unitId} = req.params 
    const unitPurchases = await UnitPurchases.findAll({where:{propertyId,unitId}});
       
    return res.json({
       unitPurchases
    });
  })
);

router.post(
    "/new",
    asyncHandler(async (req, res) => {
      console.log('buddy')
      const {
        ownerId,
        propertyId,
        unitId,
        vendorId,
        amount,
        description,
        billDueBy,
        purchaseType,
        datePurchased
      } = req.body;
  
      if (purchaseType == 'Unit') {
          
          const unitPurchase = await UnitPurchases.create({
            ownerId,
            propertyId,
            unitId,
            vendorId,
            amount,
            description,
            billDueBy,
            datePurchased
          });

          return res.json({
            purchase:unitPurchase,
          });
      }

      if (purchaseType == 'Property') {
      const propertyPurchase = await PropertyPurchases.create({
        ownerId,
        propertyId,
        vendorId,
        amount,
        description,
        billDueBy,
        datePurchased,
      });
  
      return res.json({
        purchase:propertyPurchase,
      });
    }
    })
  );

module.exports = router;