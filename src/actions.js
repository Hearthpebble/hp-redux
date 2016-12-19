/* eslint-env node*/
const shortid = require('shortid');

const ADD_PLAYER = exports.ADD_PLAYER = 'ADD_PLAYER';

exports.addPlayer = (playerClass, deck, name) => ({
  type: ADD_PLAYER,
  playerId: shortid.generate(),
  heroId: shortid.generate(),
  playerClass,
  deck,
  name,
});
