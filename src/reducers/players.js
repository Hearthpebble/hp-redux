/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const {
  ADD_PLAYER,
  SHUFFLE_DECKS,
} = require('../actions');

const initialState = {};

const players = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      const { playerId, heroId, deck, name } = action;
      return Object.assign({}, state, {
        [playerId]: {
          id: playerId,
          hero: heroId,
          deck,
          hand: [],
          graveyard: [],
          secrets: [],
          effects: [],
          auras: [],
          minions: [],
          mana: 0,
          maxMana: 10,
          name,
        },
      });
    }
    case SHUFFLE_DECKS:
      return mapValues(state, player =>
        Object.assign({}, player, {
          deck: shuffle(player.deck),
        })
      );
    default:
      return state;
  }
};

module.exports = players;
