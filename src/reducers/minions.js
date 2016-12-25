/* eslint-env node*/
const { SUMMON } = require('../actions');
const merge = require('lodash/fp/merge');
const cards = require('../../data/cards.json');

const initialState = {
  currentSequenceId: 0,
  minionsById: {},
};

const minions = (state = initialState, action) => {
  switch (action.type) {
    case SUMMON: {
      const card = cards[action.cardId];
      const newSequenceId = state.currentSequenceId + 1;
      return merge(state, {
        currentSequenceId: newSequenceId,
        minionsById: {
          [action.minionId]: {
            id: action.minionId,
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
