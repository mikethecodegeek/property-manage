import { fetch } from './csrf.js';

const GET_PROPERTIES = 'session/getProperties';

const showProperties = (properties) => ({
  type: GET_PROPERTIES,
  payload: properties
});


export const getAllProperties = (id) => async (dispatch) => {
  let properties = await fetch(`/api/properties/${id}/all`)
  dispatch(showProperties(properties.data));
  return properties;
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











