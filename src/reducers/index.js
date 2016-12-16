/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const heroes = require('./heroes');

const rootReducer = combineReducers({
  game,
  players,
  heroes,
});

module.exports = rootReducer;
