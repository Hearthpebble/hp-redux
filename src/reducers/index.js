/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const heroes = require('./heroes');
const minions = require('./minions');

const rootReducer = combineReducers({
  game,
  playersById: players,
  heroesById: heroes,
  minionsById: minions,
});

module.exports = rootReducer;
