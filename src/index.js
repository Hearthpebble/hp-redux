const { createStore } = require('redux');
const rootReducer = require('./reducers/index.js');

let store = createStore(rootReducer);

console.log(JSON.stringify(store.getState(), null, 2));
