/* eslint-env mocha*/

const { expect } = require('chai');
const heroes = require('../../src/reducers/heroes');

describe('heroes reducer', () => {
  it('should return the initial state', () => {
    expect(
      heroes(undefined, {})
    ).to.eql({
      byId: {},
    });
  });
});
