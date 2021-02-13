const express = require('express');
const asyncHandler = require('express-async-handler');

const { User,Property,Tenant, Unit, Lease, UnitPurchases ,PropertyPurchases, Vendor} = require('../../db/models');
const unit = require('../../db/models/unit');

const router = express.Router();

router.get(
  '/:userId/all',
  asyncHandler(async (req, res) => {
    const {userId} = req.params 
    const allVendors = await Vendor.findAll({where:{userId}});
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

// router.post(
//     "/new",
//     asyncHandler(async (req, res) => {
//       const {
//         ownerId,
//         propertyId,
//         unitId,
//         vendorId,
//         amount,
//         description,
//         billDueBy,
//         purchaseType
//       } = req.body;
  
//       if (purchaseType == 'Unit') {
          
//           const unitPurchase = await UnitPurchases.create({
//             ownerId,
//             propertyId,
//             unitId,
//             vendorId,
//             amount,
//             description,
//             billDueBy,
//           });

//           return res.json({
//             purchase:unitPurchase,
//           });
//       }

//       if (purchaseType == 'Unit') {
//       const propertyPurchase = await PropertyPurchases.create({
//         ownerId,
//         propertyId,
//         vendorId,
//         amount,
//         description,
//         billDueBy,
//       });
  
//       return res.json({
//         purchase:propertyPurchase,
//       });
//     }
//     })
//   );

module.exports = router;