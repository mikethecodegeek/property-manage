import { fetch } from './csrf.js';

const GET_UNITS = 'session/getUnits';

const showUnits = (units) => ({
  type: GET_UNITS,
  payload: units
});


export const getAllUnits = (propertyId) => async (dispatch) => {
  let units = await fetch(`/api/units/${propertyId}/all`)
  dispatch(showUnits(units.data));
  return units;
};

const initialState = { units: [] };

function unitsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_UNITS:
      newState = Object.assign({}, state, { units: action.payload });
      return newState;
    default:
      return state;
  }
}

export default unitsReducer;