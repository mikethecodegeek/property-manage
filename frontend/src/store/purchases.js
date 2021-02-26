import { fetch } from './csrf.js';

const GET_ALL_PURCHASES = 'session/getPurchases';
const NEW_PROPERTY_PURCHASE = 'session/newPurchase'
const NEW_UNIT_PURCHASE = 'session/newPurchase'
const PAY_PROPERTY_PURCHASE = 'session/editPurchase'
const PAY_UNIT_PURCHASE = 'session/editPurchase'
const PAY_PURCHASE = 'session/editPurchase'

const showPurchases = (purchases) => ({
  type: GET_ALL_PURCHASES,
  purchases
});

const newPropertyPurchase = (purchase) => ({
  type: NEW_PROPERTY_PURCHASE,
  purchase
});
const newUnitPurchase = (purchase) => ({
  type: NEW_UNIT_PURCHASE,
  purchase
});

const editPurchase = (purchase) => ({
  type: PAY_PURCHASE,
  purchase
});


export const getAllPurchases = (userId) => async (dispatch) => {
  let purchases = await fetch(`/api/purchases/${userId}/all`)
  console.log(purchases.data.allPurchases)
  dispatch(showPurchases(purchases.data.allPurchases));
  return purchases;
};

export const getPropertyPurchases = (propId) => async (dispatch) => {
  let purchases = await fetch(`/api/purchases/property/${propId}/all`)
  console.log(purchases.data.allPurchases)
  dispatch(showPurchases(purchases.data.allPurchases));
  return purchases;
};

export const payPurchase = (id, purchaseType) => async (dispatch) => {
    const response = await fetch('/api/purchases/pay', {
      method: 'POST',
      body: JSON.stringify({
        id,
        purchaseType
      })
    });

    if (purchaseType=='Property') {
      
      dispatch(editPurchase(response.data.purchase));
    } else {
      dispatch(editPurchase(response.data.purchase));
    }
    return response;
  };

export const createPurchase = (purchase, ownerId) => async (dispatch) => {
  // console.log('Yeah buddy')
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
    if (purchaseType=='Property') {
      console.log(response)
      dispatch(newPropertyPurchase(response.data.purchase));
    } else {
      dispatch(newUnitPurchase(response.data.purchase));
    }
    return response;
  };


const initialState = { purchases: [] };

function purchasesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_PURCHASES:
      newState = Object.assign({}, action.purchases );
      return newState;

    case NEW_PROPERTY_PURCHASE:
      newState = JSON.parse(JSON.stringify(state))
      newState.propertyPurchases.push(action.purchase)
      return newState;

    case PAY_PURCHASE:
      newState = JSON.parse(JSON.stringify(state))
      newState = newState.map(p => console.log(p))
      return newState;

    default:
      return state;
  }
}

export default purchasesReducer;