/* eslint-env mocha*/

const { expect } = require('chai');
const configureStore = require('redux-mock-store').default;
const reduxThunk = require('redux-thunk').default;
const {
  ADD_PLAYER, addPlayer,
  BURN_CARD,
  DRAW_CARD, drawCard,
  FATIGUE,
  GAIN_MANA, gainMana,
  SHUFFLE_DECKS, shuffleDecks,
  SUMMON, summon,
} = require('../src/actions');

const mockStore = configureStore([reduxThunk]);

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
  describe('DRAW_CARD', () => {
    it('should create an action to draw a card', () => {
      const store = mockStore({
        playersById: {
          playerId1: {
            deck: ['c1'],
            hand: [],
          },
        },
      });
      store.dispatch(drawCard('playerId1'));
      const action = store.getActions()[0];
      expect(action).to.eql({
        type: DRAW_CARD,
        playerId: 'playerId1',
      });
    });
    it('should create an action to burn a card', () => {
      const store = mockStore({
        playersById: {
          playerId1: {
            deck: ['c1'],
            hand: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10'],
          },
        },
      });
      store.dispatch(drawCard('playerId1'));
      const action = store.getActions()[0];
      expect(action).to.eql({
        type: BURN_CARD,
        playerId: 'playerId1',
      });
    });
    it('should create an action to fatigue a hero', () => {
      const store = mockStore({
        playersById: {
          playerId1: {
            deck: [],
            hand: [],
            heroId: 'heroId1',
          },
        },
      });
      store.dispatch(drawCard('playerId1'));
      const action = store.getActions()[0];
      expect(action).to.eql({
        type: FATIGUE,
        heroId: 'heroId1',
      });
    });
  });
  describe('GAIN_MANA', () => {
    it('should create an action to add mana', () => {
      const action = gainMana('playerId', 5);
      expect(action).to.eql({
        type: GAIN_MANA,
        playerId: 'playerId',
        mana: 5,
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
