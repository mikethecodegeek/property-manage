import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import propertiesReducer from './properties'
import unitsReducer from './units'
import tenantsReducer from './tenants'
import purchasesReducer from './purchases'
import vendorsReducer from './vendors'
import leasesReducer from './leases';


const rootReducer = combineReducers({
  session,
  userProperties: propertiesReducer,
  propertyUnits: unitsReducer,
  tenants: tenantsReducer,
  purchases: purchasesReducer,
  vendors: vendorsReducer,
  leases: leasesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
