import { fetch } from './csrf.js';

const GET_TENANTS = 'session/getTenants';
const NEW_TENANT = 'session/newTenant';

const showTenants = (tenants) => ({
  type: GET_TENANTS,
  payload: tenants
});

const addTenant = (tenant) => ({
    type: NEW_TENANT,
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
  
    dispatch(addTenant(response.data.tenant));
    return response;
  };

const initialState = { tenants: [] };

function tenantsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_TENANTS:
      newState = Object.assign({}, state, { tenants: action.payload });
      return newState;
    case NEW_TENANT:
        newState = JSON.parse(JSON.stringify(state))
        console.log(newState)
        newState.tenants.tenants.push(action.payload)
      
        return newState
    default:
      return state;
  }
}

export default tenantsReducer;