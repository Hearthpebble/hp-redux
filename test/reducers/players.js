/* eslint-env mocha*/

const { expect } = require('chai');
const players = require('../../src/reducers/players');
const { addPlayer, shuffleDecks, summon } = require('../../src/actions');
const { playersById } = require('../testData');

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
  it('should handle SHUFFLE_DECKS', () => {
    const action = shuffleDecks();
    const playerState = players(playersById, action);
    Object.keys(playerState).forEach((player) => {
      expect(playerState[player].deck).to.include.members([
        'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
        'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20',
        'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30',
      ]);
      // this has a small chance of failing if both decks happen to shuffle to the same arrays
      expect(playerState[player].deck).to.not.eql(playersById[player].deck);
    });
  });
  it('should handle SUMMON', () => {
    const action = { minionId } = summon('playerId1', 0, 'CS2_231');
    const playerState = players(playersById, action);
    console.log(playerState);
    expect(playerState['playerId1'].minions).to.eql([minionId]);
  });
});
