import { fetch } from './csrf.js';
import { useAlert } from 'react-alert'
const GET_PROPERTIES = 'session/getProperties';
const NEW_PROPERTY =  'session/newProperty'
const UPDATE_PROPERTY = 'session/updateProperty'

const showProperties = (properties) => ({
  type: GET_PROPERTIES,
  payload: properties
});

const newProperty = (property) => ({
    type: NEW_PROPERTY,
    payload:property
  });

const showUpdatedProperty = (property) => ({
    type: UPDATE_PROPERTY,
    payload: property
  });

const setPropertyFeatures = (property) => ({
    type: UPDATE_PROPERTY,
    payload: property
  });
  
  export const uploadImg = (imgData, propertyId) => async (dispatch) => {
    const { imgUrl } = imgData;
    const response = await fetch(`/api/properties/${propertyId}/photo`, {
      method: 'POST',
      body: JSON.stringify({
        imgUrl
      })
    });
    console.log(response.data)
  
    dispatch(showUpdatedProperty(response.data.currentProperty));
    return response;
  };

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
  
    dispatch(setPropertyFeatures(response.data));
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
    // console.log(response)
    dispatch(newProperty(response.data.newProperty));
    return response;
  };

const initialState = { properties: [] };

function propertiesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_PROPERTIES:
      newState = Object.assign({}, state, { properties: action.payload });
      return newState;
    case NEW_PROPERTY:
      newState = JSON.parse(JSON.stringify(state))
      newState.properties.properties.push(action.payload)
    
      return newState
    case UPDATE_PROPERTY:
        newState = JSON.parse(JSON.stringify(state))
        const newProperties = newState.properties.properties.map(prop => {
          if (prop.id === action.payload.id) {
            return action.payload
          } else {
            return prop
          }
        })
        newState.properties.properties = newProperties
        return newState
    default:
      return state;
  }
}

export default propertiesReducer;











