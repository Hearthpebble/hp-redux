/* eslint-env mocha*/

const { expect } = require('chai');
const {
  ADD_PLAYER, addPlayer,
  SHUFFLE_DECKS, shuffleDecks,
  SUMMON, summon,
} = require('../src/actions');

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
  describe('SHUFFLE_DECKS', () => {
    it('should create an action to shuffle decks ', () => {
      const action = shuffleDecks();
      expect(action).to.eql({
        type: SHUFFLE_DECKS,
      });
    });
  });
  describe('SUMMON', () => {
    it('should create an action to summon a minion ', () => {
      const action = { minionId } = summon('playerId', 0, 'cardId');
      expect(action).to.eql({
        type: SUMMON,
        minionId,
        playerId: 'playerId',
        position: 0,
        cardId: 'cardId',
      });
    });
  });
});
