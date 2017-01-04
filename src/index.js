/* eslint-env node*/

const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers/index');
const actions = require('./actions');
const reduxThunk = require('redux-thunk').default;
const configureStore = require('./configureStore').default;
const { Observable } = require('rx');

let store = configureStore();

const store$ = Observable.create(observer =>
  store.subscribe(() => observer.onNext(store.getState()))
);

// const minionDied$ = Observable.from(store.minions.minionsById)

store$.subscribe(() => {
  // console.log(JSON.stringify(store.getState(), null, 2));
})

// minionDied$.subscribe(() => {
//   console.log("minion died")
// })
store.dispatch(actions.addPlayer('', '', ''))