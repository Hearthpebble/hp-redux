/* eslint-env mocha*/

const { expect } = require('chai');
const players = require('../../src/reducers/players');
const { addPlayer, ADD_TO_GRAVEYARD, BURN_CARD, DRAW_CARD, gainMana, shuffleCard, shuffleDecks, summon } = require('../../src/actions');
const { initialPlayerState } = require('../testData');

describe('players reducer', () => {
  it('should return the initial state', () => {
    expect(
      players(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_PLAYER', () => {
    const action1 = { playerId: playerId1, heroId: heroId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { playerId: playerId2, heroId: heroId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
    const action3 = { playerId: playerId3, heroId: heroId3 } = addPlayer('Hunter', ['cardId1', 'cardId2', 'cardId3'], 'Jon');
    let playerState = players(undefined, action1);
    expect(playerState[playerId1]).to.eql({
      id: playerId1,
      hero: heroId1,
      deck: ['cardId1', 'cardId2', 'cardId3'],
      hand: [],
      graveyard: [],
      secrets: [],
      effects: [],
      auras: [],
      minions: [],
      mana: 0,
      maxMana: 10,
      name: 'Bob',
    });
    playerState = players(playerState, action2);
    expect(playerState[playerId2]).to.eql({
      id: playerId2,
      hero: heroId2,
      deck: ['cardId1', 'cardId2', 'cardId3'],
      hand: [],
      graveyard: [],
      secrets: [],
      effects: [],
      auras: [],
      minions: [],
      mana: 0,
      maxMana: 10,
      name: 'Tom',
    });
    expect(Object.keys(playerState)).to.have.lengthOf(2);
    // should not add more than 2 players
    playerState = players(playerState, action3);
    expect(Object.keys(playerState)).to.have.lengthOf(2);
  });
  it('should handle ADD_TO_GRAVEYARD', () => {
    const action1 = {
      type: ADD_TO_GRAVEYARD,
      cardId: 'cardId1',
      playerId: 'playerId1',
    };
    playerState = players(initialPlayerState, action1);
    expect(playerState.playerId1.graveyard).to.eql(['cardId1']);
  });
  it('should handle BURN_CARD', () => {
    const action1 = {
      type: BURN_CARD,
      playerId: 'playerId1',
    };
    let playerState = players(initialPlayerState, action1);
    expect(playerState.playerId1.deck).to.have.lengthOf(29);
    expect(playerState.playerId1.graveyard).to.have.lengthOf(1);
    expect(playerState.playerId1).to.contain.all.keys(['id', 'name']);
    playerState = players(playerState, action1);
    expect(playerState.playerId1.deck).to.have.lengthOf(28);
    expect(playerState.playerId1.graveyard).to.eql(['c29', 'c30']);
  });
  it('should handle DRAW_CARD', () => {
    const action1 = {
      type: DRAW_CARD,
      playerId: 'playerId1',
    };
    let playerState = players(initialPlayerState, action1);
    expect(playerState.playerId1.deck).to.have.lengthOf(29);
    expect(playerState.playerId1.hand).to.have.lengthOf(1);
    expect(playerState.playerId1).to.contain.all.keys(['id', 'name']);
    playerState = players(playerState, action1);
    expect(playerState.playerId1.deck).to.have.lengthOf(28);
    expect(playerState.playerId1.hand).to.eql(['c29', 'c30']);
  });
  it('should handle GAIN_MANA', () => {
    const action0 = gainMana('playerId1');
    const action1 = gainMana('playerId1', 1);
    const action2 = gainMana('playerId1', 2);
    const action3 = gainMana('playerId1', 11);
    let playerState = players(initialPlayerState, action0);
    expect(playerState.playerId1.mana).to.equal(1);
    playerState = players(playerState, action1);
    expect(playerState.playerId1.mana).to.equal(2);
    playerState = players(playerState, action2);
    expect(playerState.playerId1.mana).to.equal(4);
    playerState = players(playerState, action3);
    expect(playerState.playerId1.mana).to.equal(10);
    expect(playerState.playerId1).to.contain.all.keys(['id', 'name']);
  });
  it('should handle SHUFFLE_CARD', () => {
    const action1 = shuffleCard('testCard1', 'playerId2', false);
    const action2 = shuffleCard('testCard2', 'playerId2', true);
    let playerState = players(initialPlayerState, action1);
    expect(playerState.playerId2.hand).to.include.members([
      'c31', 'c32', 'c33', 'c34', 'testCard2',
    ]);
    expect(playerState.playerId2.deck).to.include.members([
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
      'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
      'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
      'testCard1',
    ]);
    playerState = players(playerState, action2);
    expect(playerState.playerId2.hand).to.include.members([
      'c31', 'c32', 'c33', 'c34',
    ]);
    expect(playerState.playerId2.deck).to.include.members([
      'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
      'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
      'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
      'testCard1', 'testCard2',
    ]);
  });
  it('should handle SHUFFLE_DECKS', () => {
    const action = shuffleDecks();
    const playerState = players(initialPlayerState, action);
    Object.keys(playerState).forEach((player) => {
      expect(playerState[player].deck).to.include.members([
        'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
        'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
        'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
      ]);
      // this has a small chance of failing if both decks happen to shuffle to the same arrays
      expect(playerState[player].deck).to.not.eql(initialPlayerState[player].deck);
    });
  });
  it('should handle SUMMON', () => {
    const action1 = { minionId: minionId1 } = summon('playerId1', 0, 'cardId');
    const action2 = { minionId: minionId2 } = summon('playerId1', 0, 'cardId');
    const action3 = { minionId: minionId3 } = summon('playerId1', 2, 'cardId');
    const action4 = { minionId: minionId4 } = summon('playerId1', 1, 'cardId');
    const action5 = { minionId: minionId5 } = summon('playerId2', 0, 'cardId');
    const action6 = { minionId: minionId6 } = summon('playerId2', 0, 'cardId');
    const action7 = { minionId: minionId7 } = summon('playerId2', 2, 'cardId');
    const action8 = { minionId: minionId8 } = summon('playerId2', 1, 'cardId');
    let playerState = players(initialPlayerState, action1);
    expect(playerState.playerId1.minions).to.eql([minionId1]);
    playerState = players(playerState, action2);
    expect(playerState.playerId1.minions).to.eql([minionId2, minionId1]);
    playerState = players(playerState, action3);
    expect(playerState.playerId1.minions).to.eql([minionId2, minionId1, minionId3]);
    playerState = players(playerState, action4);
    expect(playerState.playerId1.minions).to.eql([minionId2, minionId4, minionId1, minionId3]);
    playerState = players(initialPlayerState, action5);
    expect(playerState.playerId2.minions).to.eql([minionId5]);
    playerState = players(playerState, action6);
    expect(playerState.playerId2.minions).to.eql([minionId6, minionId5]);
    playerState = players(playerState, action7);
    expect(playerState.playerId2.minions).to.eql([minionId6, minionId5, minionId7]);
    playerState = players(playerState, action8);
    expect(playerState.playerId2.minions).to.eql([minionId6, minionId8, minionId5, minionId7]);
  });
});
