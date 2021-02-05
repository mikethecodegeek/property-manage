import { fetch } from './csrf.js';

const GET_TENANTS = 'session/getTenants';

const showTenants = (tenants) => ({
  type: GET_TENANTS,
  payload: tenants
});

const newTenant = (tenant) => ({
    type: GET_TENANTS,
    payload: tenant
  });


export const getAllTenants = (userId) => async (dispatch) => {
  let tenants = await fetch(`/api/tenants/${userId}/all`)
  console.log(tenants.data)
  dispatch(showTenants(tenants.data));
  return tenants;
};

export const createTenant = (tenant, userId) => async (dispatch) => {
    const { firstName,lastName,phoneNumber } = tenant;
 
    const response = await fetch('/api/tenants/new', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        userId
      })
    });
  
    dispatch(newTenant(response.data.tenant));
    return response;
  };

const initialState = { tenants: [] };

function tenantsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_TENANTS:
      newState = Object.assign({}, state, { tenants: action.payload });
      return newState;
    default:
      return state;
  }
}

export default tenantsReducer;