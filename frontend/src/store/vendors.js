import { fetch } from './csrf.js';

const GET_ALL_VENDORS = 'session/getVendors';
// const NEW_PURCHASE = 'session/newPurchase'

const getVendors = (vendors) => ({
  type: GET_ALL_VENDORS,
  vendors
});

// const newPurchase = (purchase) => ({
//   type: NEW_PURCHASE,
//   purchase
// });


export const getAllVendors = (userId) => async (dispatch) => {
console.log('hiiiiiitttt')
  let vendors = await fetch(`/api/vendors/${userId}/all`)
//   console.log(purchases.data.allPurchases)
  dispatch(getVendors(vendors.data.allVendors));
  return vendors;
};

// export const createPurchase = (purchase, ownerId) => async (dispatch) => {
//     const {  
//         propertyId,
//         unitId,
//         vendorId,
//         amount,
//         description,
//         billDueBy,
//         purchaseType } = purchase;
 
//     const response = await fetch('/api/purchases/new', {
//       method: 'POST',
//       body: JSON.stringify({
//         ownerId,
//         propertyId,
//         unitId,
//         vendorId,
//         amount,
//         description,
//         billDueBy,
//         purchaseType
//       })
//     });
  
//     dispatch(newPurchase(response.data.purchase));
//     return response;
//   };


const initialState = { vendors: [] };

function vendorsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_VENDORS:
      console.log(action.vendors)
      newState = Object.assign({}, action.vendors );
      return action.vendors;

    // case NEW_PURCHASE:
    //   newState = Object.assign({}, action.purchase );
    //   return newState;

    default:
      return state;
  }
}

export default vendorsReducer;