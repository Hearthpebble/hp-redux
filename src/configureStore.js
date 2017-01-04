const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');
const reduxThunk = require('redux-thunk').default;

exports.default = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(reduxThunk)
);
