/* eslint-env mocha*/

const { expect } = require('chai');
const weapons = require('../../src/reducers/weapons');

describe('weapons reducer', () => {
  it('should return the initial state', () => {
    expect(
      weapons(undefined, {})
    ).to.eql({});
  });
});
