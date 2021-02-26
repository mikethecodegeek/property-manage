import { fetch } from './csrf.js';

const GET_ALL_LEASES = 'session/getAllLeases';
const GET_LEASE = 'session/getLease';
const NEW_LEASE = 'session/newLease';
const DELETE_LEASE = 'session/deleteLease';

const showLease = (lease) => ({
  type: GET_LEASE,
  payload: lease
});

const delLease = (lease) => ({
  type: DELETE_LEASE,
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



export const deleteLease = (leaseId) => async (dispatch) => {
    // const { leaseId } = lease;
    console.log('hi')
    console.log(leaseId)
    const response = await fetch('/api/leases/delete', {
      method: 'POST',
      body: JSON.stringify({
       leaseId
      })
    });
    console.log(response.data.lease)
    dispatch(delLease(response.data.lease));
    return response;
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
    case DELETE_LEASE:
        newState = JSON.parse(JSON.stringify(state))
        console.log(action.payload.id)
        newState.leases.leases = newState.leases.leases.filter(lease =>{
          console.log(lease)
         return lease.id !== action.payload.id
        })
        return newState
    default:
      return state;
  }
}

export default leasesReducer;