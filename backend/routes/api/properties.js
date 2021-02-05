const express = require('express');
// const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User,Property,Tenant, Unit, PropertyFeature } = require('../../db/models');

const router = express.Router();


router.get(
  '/:id/all',
  asyncHandler(async (req, res) => {
    const {id} = req.params 
    const properties = await Property.findAll({where:{ownerId:id},include:[Unit,PropertyFeature]});
    let numEmpty = 0;
    properties.map(async prop => {
        const emptyUnits = await Unit.findAll({where:{propertyId:prop.id,isVacant:true}})
        let empty2 =await emptyUnits
        prop[emptyUnits] = empty2.length
        numEmpty+=empty2.length;
        return prop
    })
    console.log(numEmpty)
    return res.json({
      properties
    });
  })
);

module.exports = router;
