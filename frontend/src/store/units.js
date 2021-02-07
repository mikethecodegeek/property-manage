import { fetch } from './csrf.js';

const GET_UNITS = 'session/getUnits';

const showUnits = (units) => ({
  type: GET_UNITS,
  payload: units
});

const newUnit = (unit) => ({
  type: GET_UNITS,
  payload: unit
});



export const createUnit = (unit) => async (dispatch) => {
    const { propertyId,sqft,isVacant,rentalPrice,numOccupants,numBaths,numBeds,unitNumber,unitType } = unit;
    // console.log(property)
    const response = await fetch('/api/units/new', {
      method: 'POST',
      body: JSON.stringify({
        propertyId,
        sqft,
        isVacant,
        rentalPrice,
        numOccupants,
        numBaths,
        numBeds,
        unitNumber,
        unitType
      })
    });
  
    dispatch(newUnit(response.data.unit));
    return response;
  };

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