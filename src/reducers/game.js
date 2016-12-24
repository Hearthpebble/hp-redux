/* eslint-env node*/

const { ADD_PLAYER } = require('../actions');

const initialState = {
  players: [],
  activePlayer: 0,
  currentSequenceId: 0,
};

const game = (state = initialState, action) => {
  const { players } = state;
  switch (action.type) {
    case ADD_PLAYER: 
      return Object.assign({}, state, {
        players: [...players, action.playerId],
      });
    default:
      return state;
  }
};

module.exports = game;
