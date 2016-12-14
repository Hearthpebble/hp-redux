/* eslint-env mocha*/

const { expect } = require('chai');
const game = require('../../src/reducers/game');

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(
      game(undefined, {})
    ).to.eql({
      players: [],
      activePlayer: 0,
      currentSequenceId: 0,
    });
  });
});
