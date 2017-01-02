/* eslint-env node*/
const { shuffle, mapValues } = require('lodash');
const merge = require('lodash/fp/merge');
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
      // formula from MDN => Math.floor(Math.random() * (max - min + 1)) + min ... here, min = 0
      const newIndex = Math.floor(Math.random() * (state[action.playerId].deck.length + 1));
      const deckCopy = state[action.playerId].deck.slice(0);
      deckCopy.splice(newIndex, 0, action.cardId);

      const handCopy = state[action.playerId].hand.slice(0);

      if (handCopy.indexOf(action.cardId) !== -1) {
        handCopy.splice(handCopy.indexOf(action.cardId), 1);
      }

      return merge(state, {
        [action.playerId]: {
          deck: deckCopy,
          hand: handCopy,
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
