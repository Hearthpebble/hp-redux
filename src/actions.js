/* eslint-env node*/

const shortid = require('shortid');

const ADD_PLAYER = exports.ADD_PLAYER = 'ADD_PLAYER';
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
