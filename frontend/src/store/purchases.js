import { fetch } from './csrf.js';

const GET_ALL_PURCHASES = 'session/getPurchases';
const NEW_PURCHASE = 'session/newPurchase'

const showPurchases = (purchases) => ({
  type: GET_ALL_PURCHASES,
  purchases
});

const newPurchase = (purchase) => ({
  type: NEW_PURCHASE,
  purchase
});


export const getAllPurchases = (userId) => async (dispatch) => {
  let purchases = await fetch(`/api/purchases/${userId}/all`)
  console.log(purchases.data.allPurchases)
  dispatch(showPurchases(purchases.data.allPurchases));
  return purchases;
};

export const createPurchase = (purchase, ownerId) => async (dispatch) => {
  console.log('Yeah buddy')
    const {  
        propertyId,
        unitId,
        vendorId,
        amount,
        description,
        billDueBy,
        datePurchased,
        purchaseType } = purchase;
        console.log(purchase)
 
    const response = await fetch('/api/purchases/new', {
      method: 'POST',
      body: JSON.stringify({
        ownerId,
        propertyId,
        unitId,
        vendorId,
        amount,
        description,
        billDueBy,
        datePurchased,
        purchaseType
      })
    });
  
    dispatch(newPurchase(response.data.purchase));
    return response;
  };


const initialState = { purchases: [] };

function purchasesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_PURCHASES:
      newState = Object.assign({}, action.purchases );
      return newState;

    case NEW_PURCHASE:
      newState = Object.assign({}, action.purchase );
      return newState;

    default:
      return state;
  }
}

export default purchasesReducer;