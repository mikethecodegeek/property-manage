import { fetch } from './csrf.js';

const GET_ALL_LEASES = 'session/getAllLeases';
const GET_LEASE = 'session/getLease';
const NEW_LEASE = 'session/newLease';

const showLease = (lease) => ({
  type: GET_LEASE,
  payload: lease
});

const showLeases = (leases) => ({
  type: GET_ALL_LEASES,
  payload: leases
});

const addLease = (lease) => ({
    type: NEW_LEASE,
    payload: lease
  });


export const getAllLeases = (userId) => async (dispatch) => {
  let leases = await fetch(`/api/leases/${userId}/all`)
  // console.log(tenants.data)
  dispatch(showLeases(leases.data));
  return leases;
};

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
  
    dispatch(addLease(response.data.currentLease));
    return response;
  };

const initialState = { leases: [] };

function leasesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_LEASES:
      newState = Object.assign({}, state, { leases: action.payload });
      return newState;
      case NEW_LEASE:
        newState = JSON.parse(JSON.stringify(state))
        newState.leases.leases.push(action.payload)
      
        return newState
    default:
      return state;
  }
}

export default leasesReducer;