/* eslint-env node*/
const { ADD_PLAYER } = require('../actions');

const initialState = {};

const players = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      const { playerId, heroId, deck, name } = action;
      return {
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
      };
    }
    default:
      return state;
  }
};

module.exports = players;
