/* eslint-env mocha*/

const { expect } = require('chai');
const minions = require('../../src/reducers/minions');
const { summon } = require('../../src/actions');

describe('minions reducer', () => {
  it('should return the initial state', () => {
    expect(
      minions(undefined, {})
    ).to.eql({
      currentSequenceId: 0,
      minionsById: {},
    });
  });
  it('should handle SUMMON', () => {
    const action1 = { minionId: minionId1 } = summon('playerId1', 0, 'CS2_231'); // wisp
    const action2 = { minionId: minionId2 } = summon('playerId1', 1, 'EX1_556'); // harvest golem
    const action3 = { minionId: minionId3 } = summon('playerId2', 2, 'NEW1_030'); // deathwing
    let minionState = minions(undefined, action1);
    expect(minionState).to.eql({
      currentSequenceId: 1,
      minionsById: {
        [minionId1]: {
          id: minionId1,
          name: 'Wisp',
          sequenceId: 1,
          maxHealth: 1,
          health: 1,
          attack: 1,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
      },
    });
    minionState = minions(minionState, action2);
    expect(minionState).to.eql({
      currentSequenceId: 2,
      minionsById: {
        [minionId1]: {
          id: minionId1,
          name: 'Wisp',
          sequenceId: 1,
          maxHealth: 1,
          health: 1,
          attack: 1,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
        [minionId2]: {
          id: minionId2,
          name: 'Harvest Golem',
          sequenceId: 2,
          maxHealth: 3,
          health: 3,
          attack: 2,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
      },
    });
    minionState = minions(minionState, action3);
    expect(minionState).to.eql({
      currentSequenceId: 3,
      minionsById: {
        [minionId1]: {
          id: minionId1,
          name: 'Wisp',
          sequenceId: 1,
          maxHealth: 1,
          health: 1,
          attack: 1,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
        [minionId2]: {
          id: minionId2,
          name: 'Harvest Golem',
          sequenceId: 2,
          maxHealth: 3,
          health: 3,
          attack: 2,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
        [minionId3]: {
          id: minionId3,
          name: 'Deathwing',
          sequenceId: 3,
          maxHealth: 12,
          health: 12,
          attack: 12,
          divineShield: false,
          exhausted: true,
          alreadyAttacked: false,
          windfuryUsed: false,
          frozenFor: 0,
          effects: [],
          auras: [],
        },
      },
    });
  });
});
