const express = require('express');
const asyncHandler = require('express-async-handler');

const { User,Property,Tenant, Unit, Lease, UnitPurchases ,PropertyPurchases, Vendor, VendorType} = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();

router.get(
  '/:userId/all',
  asyncHandler(async (req, res) => {
    const {userId} = req.params 
    const allVendors = await Vendor.findAll({where:{userId},include:[VendorType]});
    // const propertyPurchases = await PropertyPurchases.findAll({where:{ownerId:userId}});
    // const allPurchases = {unitPurchases,propertyPurchases}     
    return res.json({
       allVendors
    });
  })
);

// router.get(
//   '/:propertyId/all',
//   asyncHandler(async (req, res) => {
//     const {propertyId} = req.params 
//     const propertyPurchases = await PropertyPurchases.findAll({where:{id:propertyId}});
      
//     return res.json({
//        propertyPurchases
//     });
//   })
// );

// router.get(
//   '/:propertyId/:unitId/all',
//   asyncHandler(async (req, res) => {
//     const {propertyId,unitId} = req.params 
//     const unitPurchases = await UnitPurchases.findAll({where:{propertyId,unitId}});
       
//     return res.json({
//        unitPurchases
//     });
//   })
// );

router.post(
    "/new",
    asyncHandler(async (req, res) => {
      const {
        userId,
        vendorName,
        phone,
        vendorDescription,
        vendorType,
        vendorContactName,
        city,
        state,
        address,
        email,
        zipCode
      } = req.body;
  
      console.log(req.body)
          
          const vendor = await Vendor.create({
            userId,
            vendorName,
            phone,
            vendorDescription,
            vendorType,
            vendorContactName,
            city,
            state,
            address,
            email,
            zipCode
          });

          const newVendor = await Vendor.findOne({where:{id:vendor.id},include:[VendorType]})

          return res.json({
            newVendor,
          });
      }

  ));

module.exports = router;