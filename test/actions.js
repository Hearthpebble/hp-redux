/* eslint-env mocha*/

const { expect } = require('chai');
const { ADD_PLAYER, addPlayer } = require('../src/actions');

describe('actions', () => {
  describe('ADD_PLAYER', () => {
    it('should create an action to add a player ', () => {
      const action = { playerId, heroId } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
      expect(action).to.eql({
        type: ADD_PLAYER,
        playerId,
        heroId,
        playerClass: 'Mage',
        deck: ['cardId1', 'cardId2', 'cardId3'],
        name: 'Bob',
      });
    });
  });
});
