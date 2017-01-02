/* eslint-env mocha*/

const { expect } = require('chai');
const configureStore = require('redux-mock-store').default;
const reduxThunk = require('redux-thunk').default;
const {
  ADD_EFFECT, addEffect,
  ADD_PLAYER, addPlayer,
  ADD_TO_GRAVEYARD,
  BURN_CARD,
  DRAW_CARD, drawCard,
  FATIGUE,
  FREEZE, freeze,
  GAIN_MANA, gainMana,
  KILL, kill,
  SHUFFLE_CARD, shuffleCard,
  SHUFFLE_DECKS, shuffleDecks,
  SUMMON, summon,
} = require('../src/actions');

const mockStore = configureStore([reduxThunk]);

describe('actions', () => {
  describe('ADD_EFFECT', () => {
    it('should create an action to add an effect', () => {
      const action = { effectId } = addEffect('characterId1', 'event', 'response', 'selector');
      expect(action).to.eql({
        type: ADD_EFFECT,
        effectId,
        characterId: 'characterId1',
        event: 'event',
        response: 'response',
        selector: 'selector',
      });
    });
  });
  describe('ADD_PLAYER', () => {
    it('should create an action to add a player', () => {
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
  describe('FREEZE', () => {
    it('should create an action to freeze several characters', () => {
      const action = freeze(2, 'mId1', 'mId2', 'heroId1', 'heroId2');
      expect(action).to.eql({
        type: FREEZE,
        frozenFor: 2,
        characterIds: ['mId1', 'mId2', 'heroId1', 'heroId2'],
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
  describe('KILL', () => {
    it('should create an action to add a minion to the graveyard', () => {
      const store = mockStore({
        minions: {
          minionsById: {
            minionId1: {
              cardId: 'minionId1',
            },
          },
        },
        playersById: {
          playerId1: {
            id: 'playerId1',
            minions: ['minionId1'],
          },
        },
      });
      store.dispatch(kill('minionId1'));
      const actions = store.getActions();
      expect(actions[0]).to.eql({
        type: ADD_TO_GRAVEYARD,
        cardId: 'minionId1',
        playerId: 'playerId1',
      });
      expect(actions).to.have.lengthOf(2);
    });
    it('should create an action to kill a character', () => {
      const store = mockStore({
        playersById: {},
      });
      store.dispatch(kill('minionId1'));
      const action = store.getActions()[0];
      expect(action).to.eql({
        type: KILL,
        characterId: 'minionId1',
      });
    });
  });
  describe('SHUFFLE_CARD', () => {
    it('should create an action to shuffle a card into the deck', () => {
      const action = shuffleCard('cardId', 'playerId', false);
      expect(action).to.eql({
        type: SHUFFLE_CARD,
        cardId: 'cardId',
        playerId: 'playerId',
        removeFromHand: false,
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
