import { fetch } from './csrf.js';

const GET_ALL_LEASES = 'session/getAllLeases';
const GET_LEASE = 'session/getLease';

const showLease = (lease) => ({
  type: GET_LEASE,
  payload: lease
});

const newLease = (lease) => ({
    type: GET_ALL_LEASES,
    payload: lease
  });


// export const getAllLeases = (userId) => async (dispatch) => {
//   let tenants = await fetch(`/api/tenants/${userId}/all`)
//   console.log(tenants.data)
//   dispatch(showTenants(tenants.data));
//   return tenants;
// };

export const createLease = (lease,userId) => async (dispatch) => {
    const { propertyId,unitId,tenantId,startDate,endDate,depositAmnt,unitNumber } = lease;
    console.log(lease)
    const response = await fetch('/api/leases/new', {
      method: 'POST',
      body: JSON.stringify({
        propertyId,
        unitId,
        tenantId,
        startDate,
        endDate,
        depositAmnt,
        unitNumber,
        userId,
      })
    });
  
    dispatch(newLease(response.data.lease));
    return response;
  };

const initialState = { leases: [] };

function leasesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_LEASES:
      newState = Object.assign({}, state, { leases: action.payload });
      return newState;
    default:
      return state;
  }
}

export default leasesReducer;