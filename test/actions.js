/* eslint-env mocha*/

const chai = require('chai');
const chaiSubset = require('chai-subset');
const { ADD_PLAYER, addPlayer } = require('../src/actions');

const expect = chai.expect;
chai.use(chaiSubset);

describe('actions', () => {
  describe('ADD_PLAYER', () => {
    it('should create an action to add a player ', () => {
      const action = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
      expect(action).to.containSubset({
        type: ADD_PLAYER,
        playerClass: 'Mage',
        deck: ['cardId1', 'cardId2', 'cardId3'],
        name: 'Bob',
      });
      expect(action).to.contain.all.keys(['playerId', 'heroId']);
    });
  });
});
