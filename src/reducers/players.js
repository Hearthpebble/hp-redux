/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const merge = require('lodash/fp/merge');
const {
  ADD_PLAYER,
  BURN_CARD,
  SHUFFLE_DECKS,
  SUMMON,
} = require('../actions');

const initialState = {};

const players = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      const { playerId, heroId, deck, name } = action;
      return merge(state, {
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
    case BURN_CARD: {
      const deck = state[action.playerId].deck;
      return Object.assign({}, state, {
        [action.playerId]: Object.assign({}, state[action.playerId], {
          deck: [
            ...deck.slice(0, deck.length - action.count),
          ],
          graveyard: [
            ...deck.slice(-action.count),
            ...state[action.playerId].graveyard,
          ],
        }),
      });
    }
    case SHUFFLE_DECKS:
      return mapValues(state, player =>
        merge(player, {
          deck: shuffle(player.deck),
        })
      );
    case SUMMON:
      return merge(state, {
        [action.playerId]: {
          minions: [
            ...state[action.playerId].minions.slice(0, action.position),
            action.minionId,
            ...state[action.playerId].minions.slice(action.position),
          ],
        },
      });

    default:
      return state;
  }
};

module.exports = players;
