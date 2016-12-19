/* eslint-env mocha*/

const { expect } = require('chai');
const players = require('../../src/reducers/players');

describe('players reducer', () => {
  it('should return the initial state', () => {
    expect(
      players(undefined, {})
    ).to.eql({});
  });
});
