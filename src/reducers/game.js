/* eslint-env node*/

const initialState = {
  players: [],
  activePlayer: 0,
  currentSequenceId: 0,
};

const game = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

module.exports = game;
