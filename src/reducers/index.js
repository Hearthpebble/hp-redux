/* eslint-env node*/

const { combineReducers } = require('redux');
const players = require('./players');
const heroes = require('./heroes');
const weapons = require('./weapons');
const auras = require('./auras');
const minions = require('./minions');
const secrets = require('./secrets');
const deckCards = require('./deckCards');
const effects = require('./effects');

const rootReducer = combineReducers({
  deckCardsById: deckCards,
  players,
  heroesById: heroes,
  weaponsById: weapons,
  aurasById: auras,
  minions,
  secretsById: secrets,
  effectsById: effects,
});

module.exports = rootReducer;
