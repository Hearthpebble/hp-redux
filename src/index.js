/* eslint-env node*/

const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');
const reduxThunk = require('redux-thunk').default;

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);
const unsubscribe = store.subscribe(() => {
  console.log(JSON.stringify(store.getState(), null, 2));
});
console.log('huh')
store.dispatch(actions.addPlayer('Mage', ['c1', 'c2'], 'Jeff'));