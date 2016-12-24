/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const {
  ADD_PLAYER,
  SHUFFLE_DECKS,
  SUMMON,
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
    case SUMMON:
      return Object.assign({}, state, {
        [action.playerId]: {
          HEY: 'HEY'
        }
        // minions: [
        //   ...state[action.playerId].minions.slice(o, position),
        //   action.minionId,
        //   ...state[action.playerId].minions.slice(position),
        // ]
      });

    default:
      return state;
  }
};

module.exports = players;
