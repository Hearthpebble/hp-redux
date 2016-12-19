/* eslint-env mocha*/

const { expect } = require('chai');
const deckCards = require('../../src/reducers/deckCards');

describe('Deck cards reducer', () => {
  it('should return the initial state', () => {
    expect(
      deckCards(undefined, {})
    ).to.eql({});
  });
});
