/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const minions = require('./minions');
const deckCards = require('./deckCards');

const rootReducer = combineReducers({
  game,
  deckCardsByIds: deckCards,
  playersById: players,
  heroesById: heroes,
  minionsById: minions,
});

module.exports = rootReducer;
