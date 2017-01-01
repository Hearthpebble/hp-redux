/* eslint-env node*/

const { ADD_EFFECT, KILL, SUMMON, FREEZE } = require('../actions');

const merge = require('lodash/fp/merge');
const cards = require('../../data/cards.json');

const initialState = {
  currentSequenceId: 0,
  minionsById: {},
};

const minions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EFFECT:
      if (!state.minionsById.hasOwnProperty(action.characterId)) {
        return state;
      }
      return merge(state, {
        minionsById: {
          [action.characterId]: {
            effects: [...state.minionsById[action.characterId].effects, action.effectId],
          },
        },
      });
    case KILL: {
      const copy = Object.assign({}, state);
      delete copy.minionsById[action.characterId];
      return copy;
    }
    case FREEZE: {
      const newFreeze = {
        minionsById: {},
      };

      action.characterIds.forEach((id) => {
        if (state.minionsById.hasOwnProperty(id)) {
          newFreeze.minionsById[id] = {
            frozenFor: action.frozenFor,
          };
        }
      });
      return merge(state, newFreeze);
    }
    case SUMMON: {
      const card = cards[action.cardId];
      const newSequenceId = state.currentSequenceId + 1;
      return merge(state, {
        currentSequenceId: newSequenceId,
        minionsById: {
          [action.minionId]: {
            id: action.minionId,
            cardId: card.id,
            name: card.name,
            sequenceId: newSequenceId,
            attack: card.attack,
            maxHealth: card.health,
            health: card.health,
            divineShield: false,
            exhausted: true,
            alreadyAttacked: false,
            windfuryUsed: false,
            frozenFor: 0,
            effects: [],
            auras: [],
          },
        },
      });
    }
    default:
      return state;
  }
};

module.exports = minions;
