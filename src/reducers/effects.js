/* eslint-env node*/

const { ADD_EFFECT } = require('../actions');
const merge = require('lodash/fp/merge');

const initialState = {};

const effects = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EFFECT: {
      const { effectId, characterId, event, response, selector } = action;
      return merge(state, {
        effectId,
        characterId,
        event,
        response,
        selector,
      });
    }
    default:
      return state;
  }
};

module.exports = effects;
