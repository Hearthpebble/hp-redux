/* eslint-env mocha*/

const { expect } = require('chai');
const heroes = require('../../src/reducers/heroes');
const { addPlayer, FATIGUE } = require('../../src/actions');
const { initialHeroState } = require('../testData');

describe('heroes reducer', () => {
  it('should return the initial state', () => {
    expect(
      heroes(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_PLAYER', () => {
    const action = { heroId: heroId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { heroId: heroId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
    let heroState = heroes(undefined, action);
    expect(heroState[heroId1]).to.eql({
      id: heroId1,
      playerClass: 'Mage',
      weapon: null,
      maxHealth: 30,
      health: 30,
      fatigue: 0,
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
      maxHealth: 30,
      health: 30,
      fatigue: 0,
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
  it('should handle FATIGUE', () => {
    const action1 = {
      type: FATIGUE,
      heroId: 'heroId1',
    };
    let heroState = heroes(initialHeroState, action1);
    expect(heroState.heroId1.fatigue).to.equal(1);
    expect(heroState.heroId1.health).to.equal(29);
    heroState = heroes(heroState, action1);
    expect(heroState.heroId1.fatigue).to.equal(2);
    expect(heroState.heroId1.health).to.equal(27);
    heroState = heroes(heroState, action1);
    expect(heroState.heroId1.fatigue).to.equal(3);
    expect(heroState.heroId1.health).to.equal(24);
    expect(heroState.heroId1).to.contain.all.keys(['id', 'health']);
  });
});
