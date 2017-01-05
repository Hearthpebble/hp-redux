/* eslint-env node*/

const actions = require('./actions');
const configureStore = require('./configureStore').default;
const { minionDied$ } = require('./observables');
const { observableFromStore } = require('./utils');

const store = configureStore();

// creates Observable from the store
const store$ = observableFromStore(store);

// store$.subscribe(state => {
//   console.log('state changed', state.minions.minionsById);
// })

minionDied$(store$).subscribe(minionId =>
  store.dispatch(actions.kill(minionId))
);

const p1 = { playerId } = actions.addPlayer('Mage', ['c1', 'c2', 'c3'], 'bob');
store.dispatch(p1);
store.dispatch(actions.summon(playerId, 0, 'CS2_231'));
store.dispatch(actions.summon(playerId, 0, 'CS2_231'));
store.dispatch(actions.summon(playerId, 0, 'EX1_556'));
