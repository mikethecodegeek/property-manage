import { fetch } from './csrf.js';

const GET_ALL_VENDORS = 'session/getVendors';
const CREATE_VENDOR = 'session/newVendor'
const DELETE_VENDOR = 'session/deleteVendor'
// const NEW_PURCHASE = 'session/newPurchase'

const getVendors = (vendors) => ({
  type: GET_ALL_VENDORS,
  vendors
});

const newVendor= (vendor) => ({
  type: CREATE_VENDOR,
  vendor
});

const removeVendor= (vendor) => ({
  type: DELETE_VENDOR,
  vendor
});


export const getAllVendors = (userId) => async (dispatch) => {
  let vendors = await fetch(`/api/vendors/${userId}/all`)
//   console.log(purchases.data.allPurchases)
  dispatch(getVendors(vendors.data.allVendors));
  return vendors;
};

export const deleteVendor = (id) => async (dispatch) => {

    const response = await fetch('/api/vendors/delete', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    });
  
    dispatch(removeVendor(response.data.vendor));
    return response;
  };

export const createVendor = (vendor, userId) => async (dispatch) => {
  // console.log(userId,vendor)
    const {  
      vendorName,
      phone,
      vendorDescription,
      vendorType,
      vendorContactName,
      city,
      state,
      address,
      email,
      zipCode,
      } = vendor;
 
    const response = await fetch('/api/vendors/new', {
      method: 'POST',
      body: JSON.stringify({
        vendorName,
        phone,
        vendorDescription,
        vendorType,
        vendorContactName,
        city,
        state,
        address,
        email,
        zipCode,
        userId,
      })
    });
  
    dispatch(newVendor(response.data.newVendor));
    return response;
  };


const initialState = { vendors: [] };

function vendorsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_VENDORS:
      console.log(action.vendors)
      newState = Object.assign({}, action.vendors );
      return action.vendors;

    case CREATE_VENDOR:
      newState = JSON.parse(JSON.stringify(state))
      console.log(newState)
      console.log(action.vendor)
      newState.push(action.vendor)
      return newState;

    case DELETE_VENDOR:
        newState = JSON.parse(JSON.stringify(state))
        console.log(action.payload.id)
        newState = newState.filter(vendor =>{
         return vendor.id !== action.payload.id
        })
        return newState

    default:
      return state;
  }
}

export default vendorsReducer;