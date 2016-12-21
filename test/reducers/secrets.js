/* eslint-env mocha*/

const { expect } = require('chai');
const secrets = require('../../src/reducers/secrets');

describe('secrets reducer', () => {
  it('should return the initial state', () => {
    expect(
      secrets(undefined, {})
    ).to.eql({});
  });
});
