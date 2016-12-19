/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const heroes = require('./heroes');
const deckCards = require('./deckCards');

const rootReducer = combineReducers({
  game,
  deckCardsByIds: deckCards,
  playersById: players,
  heroesById: heroes,
});

module.exports = rootReducer;
