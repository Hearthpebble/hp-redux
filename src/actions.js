/* eslint-env node*/

const shortid = require('shortid');

const ADD_PLAYER = exports.ADD_PLAYER = 'ADD_PLAYER';
const BURN_CARD = exports.BURN_CARD = 'BURN_CARD';
const DRAW_CARD = exports.DRAW_CARD = 'DRAW_CARD';
const FATIGUE = exports.FATIGUE = 'FATIGUE';
const GAIN_MANA = exports.GAIN_MANA = 'GAIN_MANA';
const SHUFFLE_DECKS = exports.SHUFFLE_DECKS = 'SHUFFLE_DECKS';
const SUMMON = exports.SUMMON = 'SUMMON';

exports.addPlayer = (playerClass, deck, name) => ({
  type: ADD_PLAYER,
  playerId: shortid.generate(),
  heroId: shortid.generate(),
  playerClass,
  deck,
  name,
});

exports.burnCard = (playerId, count) => ({
  type: BURN_CARD,
  playerId,
  count,
});

exports.drawCard = (playerId, count) => ({
  type: DRAW_CARD,
  playerId,
  count,
});

exports.fatigue = (heroId, count) => ({
  type: FATIGUE,
  heroId,
  count,
});

exports.gainMana = (playerId, mana = 1) => ({
  type: GAIN_MANA,
  playerId,
  mana,
});

exports.shuffleDecks = () => ({
  type: SHUFFLE_DECKS,
});

exports.summon = (playerId, position, cardId) => ({
  type: SUMMON,
  minionId: shortid.generate(),
  playerId,
  position,
  cardId,
});
