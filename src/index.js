/* eslint-env node*/

const { createStore } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');

let store = createStore(rootReducer);
let unsubscribe = store.subscribe(() => {
  console.log(JSON.stringify(store.getState(), null, 2));
});
