/* eslint-env node*/

const { ADD_EFFECT, ADD_PLAYER, FATIGUE, FREEZE, KILL } = require('../actions');
const merge = require('lodash/fp/merge');

const initialState = {};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EFFECT:
      if (!state.hasOwnProperty(action.characterId)) {
        return state;
      }
      return merge(state, {
        [action.characterId]: {
          effects: [...state[action.characterId].effects, action.effectId],
        },
      });
    case ADD_PLAYER: {
      const { heroId, playerClass } = action;
      return merge(state, {
        [heroId]: {
          id: heroId,
          playerClass,
          weapon: null,
          maxHealth: 30,
          health: 30,
          fatigue: 0,
          armor: 0,
          attack: 0,
          immune: false,
          frozenFor: 0,
          usedWindfury: false,
          alreadyAttacked: false,
          effects: [],
          auras: [],
        },
      });
    }
    case FATIGUE: {
      const { fatigue, health } = state[action.heroId];
      return merge(state, {
        [action.heroId]: {
          fatigue: fatigue + 1,
          health: health - (fatigue + 1),
        },
      });
    }
    case KILL: {
      const copy = Object.assign({}, state);
      delete copy[action.characterId];
      return copy;
    }
    case FREEZE: {
      const newFreeze = {};

      action.characterIds.forEach((id) => {
        if (state.hasOwnProperty(id)) {
          newFreeze[id] = {
            frozenFor: action.frozenFor,
          };
        }
      });

      return merge(state, newFreeze);
    }
    default:
      return state;
  }
};

module.exports = heroes;
