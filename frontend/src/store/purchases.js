import { fetch } from './csrf.js';

const GET_ALL_PURCHASES = 'session/getPurchases';

const showPurchases = (purchases) => ({
  type: GET_ALL_PURCHASES,
  purchases
});


export const getAllPurchases = (userId) => async (dispatch) => {
  let purchases = await fetch(`/api/purchases/${userId}/all`)
  console.log(purchases.data.allPurchases)
  dispatch(showPurchases(purchases.data.allPurchases));
  return purchases;
};


const initialState = { purchases: [] };

function purchasesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_PURCHASES:
        console.log(action.purchases)
      newState = Object.assign({}, action.purchases );
      return newState;
    default:
      return state;
  }
}

export default purchasesReducer;