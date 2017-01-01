/* eslint-env mocha*/

const { expect } = require('chai');
const effects = require('../../src/reducers/effects');
const { addEffect } = require('../../src/actions');

describe('effects reducer', () => {
  it('should return the initial state', () => {
    expect(
      effects(undefined, {})
    ).to.eql({});
  });
  it('should handle ADD_EFFECT', () => {
    const action1 = { effectId } = addEffect('heroId1', 'event', 'response', 'selector');
    const effectState = effects({}, action1);
    expect(effectState).to.eql({
      effectId,
      characterId: 'heroId1',
      event: 'event',
      response: 'response',
      selector: 'selector',
    });
  });
});
