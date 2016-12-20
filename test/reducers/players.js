/* eslint-env mocha*/

const { expect } = require('chai');
const players = require('../../src/reducers/players');
const { addPlayer } = require('../../src/actions');

describe('players reducer', () => {
  it('should return the initial state', () => {
    expect(
      players(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_PLAYER', () => {
    const action1 = { playerId: playerId1, heroId: heroId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { playerId: playerId2, heroId: heroId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
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
  });
});
