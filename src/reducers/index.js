/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const heroes = require('./heroes');
const weapons = require('./weapons');

const rootReducer = combineReducers({
  game,
  playersById: players,
  heroesById: heroes,
  weaponsById: weapons,
});

module.exports = rootReducer;
