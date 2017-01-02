/* eslint-env node*/

const shortid = require('shortid');

const ADD_EFFECT = exports.ADD_EFFECT = 'ADD_EFFECT';
const ADD_PLAYER = exports.ADD_PLAYER = 'ADD_PLAYER';
const ADD_TO_GRAVEYARD = exports.ADD_TO_GRAVEYARD = 'ADD_TO_GRAVEYARD';
const BURN_CARD = exports.BURN_CARD = 'BURN_CARD';
const DRAW_CARD = exports.DRAW_CARD = 'DRAW_CARD';
const FATIGUE = exports.FATIGUE = 'FATIGUE';
const FREEZE = exports.FREEZE = 'FREEZE';
const GAIN_MANA = exports.GAIN_MANA = 'GAIN_MANA';
const KILL = exports.KILL = 'KILL';
const SHUFFLE_CARD = exports.SHUFFLE_CARD = 'SHUFFLE_CARD';
const SHUFFLE_DECKS = exports.SHUFFLE_DECKS = 'SHUFFLE_DECKS';
const SUMMON = exports.SUMMON = 'SUMMON';

exports.addEffect = (characterId, event, response, selector) => ({
  type: ADD_EFFECT,
  effectId: shortid.generate(),
  characterId,
  event,
  response,
  selector,
});

exports.addPlayer = (playerClass, deck, name) => ({
  type: ADD_PLAYER,
  playerId: shortid.generate(),
  heroId: shortid.generate(),
  playerClass,
  deck,
  name,
});

exports.drawCard = playerId => (dispatch, getState) => {
  const { deck, hand, heroId } = getState().playersById[playerId];
  if (deck.length === 0) {
    dispatch({
      type: FATIGUE,
      heroId,
    });
  } else if (hand.length === 10) {
    dispatch({
      type: BURN_CARD,
      playerId,
    });
  } else {
    dispatch({
      type: DRAW_CARD,
      playerId,
    });
  }
};

exports.freeze = (frozenFor, ...characterIds) => ({
  type: FREEZE,
  frozenFor,
  characterIds,
});

exports.gainMana = (playerId, mana = 1) => ({
  type: GAIN_MANA,
  playerId,
  mana,
});

exports.kill = characterId => (dispatch, getState) => {
  const { playersById, minions } = getState();
  const playerKey = Object.keys(playersById).find(key =>
    playersById[key].minions.includes(characterId)
  );

  if (playerKey) {
    dispatch({
      type: ADD_TO_GRAVEYARD,
      cardId: minions.minionsById[characterId].cardId,
      playerId: playersById[playerKey].id,
    });
  }
  dispatch({
    type: KILL,
    characterId,
  });
};

exports.shuffleCard = (cardId, playerId, removeFromHand) => ({
  type: SHUFFLE_CARD,
  cardId,
  playerId,
  removeFromHand,
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
