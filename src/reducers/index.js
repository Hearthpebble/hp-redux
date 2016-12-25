/* eslint-env node*/

const { combineReducers } = require('redux');
const game = require('./game');
const players = require('./players');
const heroes = require('./heroes');
const weapons = require('./weapons');
const minions = require('./minions');
const secrets = require('./secrets');
const deckCards = require('./deckCards');

const rootReducer = combineReducers({
  game,
  deckCardsById: deckCards,
  playersById: players,
  heroesById: heroes,
  weaponsById: weapons,
  minions,
  secretsById: secrets,
});

module.exports = rootReducer;
