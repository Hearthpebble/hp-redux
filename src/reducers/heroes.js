/* eslint-env node*/

const { ADD_PLAYER } = require('../actions');
const merge = require('lodash/fp/merge');

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
          health: 30,
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
    default:
      return state;
  }
};

module.exports = heroes;
