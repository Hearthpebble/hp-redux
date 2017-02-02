/* eslint-env mocha*/

const { expect } = require('chai');
const auras = require('../../src/reducers/auras');

describe('auras reducer', () => {
  it('should return the initial state', () => {
    expect(
      auras(undefined, {})
    ).to.eql({});
  });
});
