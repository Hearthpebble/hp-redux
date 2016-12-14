/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');

const rootReducer = combineReducers({
  game,
  players,
});

module.exports = rootReducer;
