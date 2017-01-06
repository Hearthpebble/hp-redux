/* eslint-env node*/

const { ADD_EFFECT, ADD_PLAYER, DAMAGE, FATIGUE, FREEZE, HEAL, KILL } = require('../actions');
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
    case DAMAGE: {
      const newHealth = {};

      action.characterIds.forEach((id) => {
        if (state.hasOwnProperty(id)) {
          newHealth[id] = {
            health: state[id].health - action.amount,
          };
        }
      });

      return merge(state, newHealth);
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
    case HEAL: {
      const newHealth = {};

      action.characterIds.forEach((id) => {
        if (state.hasOwnProperty(id)) {
          if (state[id].health + action.amount >= state[id].maxHealth) {
            newHealth[id] = {
              health: state[id].maxHealth,
            };
          } else {
            newHealth[id] = {
              health: state[id].health + action.amount,
            };
          }
        }
      });

      return merge(state, newHealth);
    }
    case KILL: {
      const copy = Object.assign({}, state);
      delete copy[action.characterId];
      return copy;
    }
    default:
      return state;
  }
};

module.exports = heroes;
