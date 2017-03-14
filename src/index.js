/* eslint-env node*/

const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');
const reduxThunk = require('redux-thunk').default;

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);

module.exports = {
  store,
  actions,
};
