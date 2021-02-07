import { fetch } from './csrf.js';

const GET_PROPERTIES = 'session/getProperties';
// const NEW_PROPERTY =  'session/newProperty'

const showProperties = (properties) => ({
  type: GET_PROPERTIES,
  payload: properties
});

const newProperty = (property) => ({
    type: GET_PROPERTIES,
    payload: property
  });

const setPropertyFeatures = (property) => ({
    type: GET_PROPERTIES,
    payload: property
  });
  


export const getAllProperties = (id) => async (dispatch) => {
  let properties = await fetch(`/api/properties/${id}/all`)
  dispatch(showProperties(properties.data));
  return properties;
};

export const createPropertyFeatures = (property, propertyId) => async (dispatch) => {
    const { size,gym,pool,wifi,clubhouse,petsAllowed,numParkingSpots,overheadParking } = property;
    console.log(property)
    const response = await fetch(`/api/properties/${propertyId}/features/new`, {
      method: 'POST',
      body: JSON.stringify({
        size,
        gym,
        pool,
        wifi,
        clubhouse,
        petsAllowed,
        numParkingSpots,
        overheadParking
      })
    });
  
    dispatch(setPropertyFeatures(response.data.property));
    return response;
  };

export const createProperty = (property,ownerId) => async (dispatch) => {
    const { city,state,address,zipCode,monthlyPayment,propertyName,propertyType,numUnits } = property;
    console.log(property)
    const response = await fetch('/api/properties/new', {
      method: 'POST',
      body: JSON.stringify({
        city,
        state,
        address,
        zipCode,
        monthlyPayment,
        propertyName,
        propertyType,
        numUnits,
        ownerId
      })
    });
  
    dispatch(newProperty(response.data.property));
    return response;
  };

const initialState = { properties: [] };

function propertiesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_PROPERTIES:
      newState = Object.assign({}, state, { properties: action.payload });
      return newState;
    default:
      return state;
  }
}

export default propertiesReducer;











