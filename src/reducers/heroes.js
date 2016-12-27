/* eslint-env node*/

const { ADD_PLAYER, FATIGUE } = require('../actions');
const merge = require('lodash/fp/merge');
const times = require('lodash/times');

const initialState = {};

const heroes = (state = initialState, action) => {
  switch (action.type) {
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
      let newFatigue = state[action.heroId].fatigue;
      let newHealth = state[action.heroId].health;
      times(action.count, () => {
        newFatigue += 1;
        newHealth -= newFatigue;
      });

      return merge(state, {
        [action.heroId]: {
          fatigue: newFatigue,
          health: newHealth,
        },
      });
    }
    default:
      return state;
  }
};

module.exports = heroes;
