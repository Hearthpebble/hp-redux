/* eslint-env mocha*/

const { expect } = require('chai');
const heroes = require('../../src/reducers/heroes');
const { addPlayer, addEffect, FATIGUE, KILL, freeze } = require('../../src/actions');
const { initialHeroState } = require('../testData');

describe('heroes reducer', () => {
  it('should return the initial state', () => {
    expect(
      heroes(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_EFFECT', () => {
    const action1 = { effectId } = addEffect('heroId1', 'event', 'response', 'selector');
    const heroState = heroes(initialHeroState, action1);
    expect(heroState.heroId1.effects).to.eql([effectId]);
  });
  it('should handle ADD_PLAYER', () => {
    const action1 = { heroId: heroId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { heroId: heroId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
    let heroState = heroes(undefined, action1);
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
  it('should handle FREEZE', () => {
    const action1 = freeze(1, 'heroId1');
    const action2 = freeze(2, 'heroId1', 'heroId2', 'mId1', 'mId2');
    let heroState = heroes(initialHeroState, action1);
    expect(heroState.heroId1.frozenFor).to.equal(1);
    expect(heroState.heroId2.frozenFor).to.equal(0);
    heroState = heroes(heroState, action2);
    expect(heroState.heroId1.frozenFor).to.equal(2);
    expect(heroState.heroId2.frozenFor).to.equal(2);
    expect(heroState.heroId1).to.contain.all.keys(['id', 'frozenFor']);
  });
  it('should handle KILL', () => {
    const action1 = {
      type: KILL,
      characterId: 'heroId1',
    };
    const heroState = heroes(initialHeroState, action1);
    expect(heroState).to.have.all.keys(['heroId2']);
  });
});
