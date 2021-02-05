import { fetch } from './csrf.js';

const GET_TENANTS = 'session/getTenants';

const showTenants = (tenants) => ({
  type: GET_TENANTS,
  payload: tenants
});


export const getAllTenants = (userId) => async (dispatch) => {
  let tenants = await fetch(`/api/tenants/${userId}/all`)
  console.log(tenants.data)
  dispatch(showTenants(tenants.data));
  return tenants;
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