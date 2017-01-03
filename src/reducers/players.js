/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const merge = require('lodash/fp/merge');
const { randomInt } = require('../utils');
const {
  ADD_PLAYER,
  ADD_TO_GRAVEYARD,
  BURN_CARD,
  DRAW_CARD,
  GAIN_MANA,
  SHUFFLE_CARD,
  SHUFFLE_DECKS,
  SUMMON,
} = require('../actions');

const initialState = {};

const players = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      if (Object.keys(state).length === 2) {
        return state;
      }
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
    case ADD_TO_GRAVEYARD:
      return merge(state, {
        [action.playerId]: {
          graveyard: [...state[action.playerId].graveyard, action.cardId],
        },
      });
    case BURN_CARD: {
      const { deck } = state[action.playerId];
      return Object.assign({}, state, {
        [action.playerId]: Object.assign({}, state[action.playerId], {
          deck: [
            ...deck.slice(0, deck.length - 1),
          ],
          graveyard: [
            ...deck.slice(-1),
            ...state[action.playerId].graveyard,
          ],
        }),
      });
    }
    case DRAW_CARD: {
      const { deck } = state[action.playerId];
      return Object.assign({}, state, {
        [action.playerId]: Object.assign({}, state[action.playerId], {
          deck: [
            ...deck.slice(0, deck.length - 1),
          ],
          hand: [
            ...deck.slice(-1),
            ...state[action.playerId].hand,
          ],
        }),
      });
    }
    case GAIN_MANA: {
      let newMana = action.mana + state[action.playerId].mana;
      if (newMana > 10) {
        newMana = 10;
      }

      return merge(state, {
        [action.playerId]: {
          mana: newMana,
        },
      });
    }
    case SHUFFLE_CARD: {
      const newIndex = randomInt(0, state[action.playerId].deck.length);
      let handIndex = state[action.playerId].hand.length;
        // by default the slice returns a copy of hand

      if (action.removeFromHand === true) {
        handIndex = state[action.playerId].hand.indexOf(action.cardId);
          // sets up the removal logic in the return statement
      }

      return merge(state, {
        [action.playerId]: {
          deck: [
            ...state[action.playerId].deck.slice(0, newIndex),
            action.cardId,
            ...state[action.playerId].deck.slice(newIndex),
          ],
          hand: [
            ...state[action.playerId].hand.slice(0, handIndex),
            ...state[action.playerId].hand.slice(handIndex + 1),
          ],
        },
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
