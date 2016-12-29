/* eslint-env node*/

const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');
const reduxThunk = require('redux-thunk').default;

let store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);
let unsubscribe = store.subscribe(() => {
  console.log(JSON.stringify(store.getState(), null, 2));
});
