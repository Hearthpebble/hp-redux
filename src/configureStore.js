const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const reduxThunk = require('redux-thunk').default;

/**
 * Creates redux store with given preloadedState and applies middleware
 *
 * @param {Object} preloadedState
 */
exports.default = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(reduxThunk)
);
