/* eslint-env mocha*/

const { expect } = require('chai');
const heroes = require('../../src/reducers/heroes');
const { addPlayer } = require('../../src/actions');

describe('heroes reducer', () => {
  it('should return the initial state', () => {
    expect(
      heroes(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_PLAYER', () => {
    const action1 = { heroId: heroId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { heroId: heroId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
    let heroState = heroes(undefined, action1);
    expect(heroState[heroId1]).to.eql({
      id: heroId1,
      playerClass: 'Mage',
      weapon: null,
      health: 30,
      armor: 0,
      attack: 0,
      immune: false,
      frozenFor: 0,
      usedWindfury: false,
      alreadyAttacked: false,
      effects: [],
      auras: [],
    });
    heroState = heroes(heroState, action2);
    expect(heroState[heroId2]).to.eql({
      id: heroId2,
      playerClass: 'Druid',
      weapon: null,
      health: 30,
      armor: 0,
      attack: 0,
      immune: false,
      frozenFor: 0,
      usedWindfury: false,
      alreadyAttacked: false,
      effects: [],
      auras: [],
    });
    expect(Object.keys(heroState)).to.have.lengthOf(2);
  });
});
