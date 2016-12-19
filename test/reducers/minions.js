/* eslint-env mocha*/

const { expect } = require('chai');
const minions = require('../../src/reducers/minions');

describe('minions reducer', () => {
  it('should return the initial state', () => {
    expect(
      minions(undefined, {})
    ).to.eql({});
  });
});
