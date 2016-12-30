/* eslint-env mocha*/

const { expect } = require('chai');
const heroPowers = require('../../src/reducers/heroPowers');

describe('heroPowers reducer', () => {
  it('should return the initial state', () => {
    expect(
      heroPowers(undefined, {})
    ).to.eql({});
  });
});
