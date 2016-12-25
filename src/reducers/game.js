/* eslint-env node*/

const { ADD_PLAYER } = require('../actions');
const merge = require('lodash/fp/merge');

const initialState = {
  players: [],
  activePlayer: 0,
};

const game = (state = initialState, action) => {
  const { players } = state;
  switch (action.type) {
    case ADD_PLAYER:
      return merge(state, {
        players: [...players, action.playerId],
      });
    default:
      return state;
  }
};

module.exports = game;
