import { fetch } from './csrf.js';

const GET_UNITS = 'session/getUnits';
const UPDATE_UNIT = 'session/updateUnit';

const showUnits = (units) => ({
  type: GET_UNITS,
  payload: units
});

const updateUnit = (unit) => ({
  type: UPDATE_UNIT,
  payload: unit
});




// export const createUnit = (unit,userId) => async (dispatch) => {
//     const { propertyId,sqft,isVacant,rentalPrice,numOccupants,numBaths,numBeds,unitNumber,unitType } = unit;
//     // console.log(property)
//     const response = await fetch('/api/units/new', {
//       method: 'POST',
//       body: JSON.stringify({
//         propertyId,
//         sqft,
//         isVacant,
//         rentalPrice,
//         numOccupants,
//         numBaths,
//         numBeds,
//         unitNumber,
//         unitType,
//         userId
//       })
//     });
  
  //   dispatch(newUnit(response.data.unit));
  //   return response;
  // };

export const editUnit = (unit,userId) => async (dispatch) => {
    const { propertyId,sqft,isVacant,rentalPrice,numOccupants,numBaths,numBeds,unitNumber,unitType,unitId } = unit;
    // console.log(property)
    const response = await fetch('/api/units/edit', {
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
        unitType,
        userId,
        unitId
      })
    });
  
    dispatch(updateUnit(response.data));
    return response;
  };

export const getAllUnits = (propertyId,userId) => async (dispatch) => {
  let units = await fetch(`/api/units/${userId}/${propertyId}/all`)
  dispatch(showUnits(units.data));
  return units;
};

export const getUserUnits = (userId) => async (dispatch) => {
    console.log('units hits')
  let units = await fetch(`/api/units/${userId}/all`)
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
    case UPDATE_UNIT:
        newState = JSON.parse(JSON.stringify(state))
        // console.log('LOOOOOOOOK HEEEEERE',action.payload.currentUnit)
        const newUnits = newState.units.units.map(prop => {
          console.log(prop)
          if (prop.id === action.payload.currentUnit.id) {
            console.log('changed', action.payload.currentUnit)
            return action.payload.currentUnit
          } else {
            return prop
          }
        })
    
        newState.units.units = newUnits
        return newState  
    default:
      return state;
  }
}

export default unitsReducer;