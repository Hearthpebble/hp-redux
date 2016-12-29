/* eslint-env mocha*/

const { expect } = require('chai');
const game = require('../../src/reducers/game');
const { addPlayer } = require('../../src/actions');

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(
      game(undefined, {})
    ).to.eql({
      players: [],
      activePlayer: 0,
    });
  });
  it('should handle ADD_PLAYER', () => {
    const action1 = { playerId: playerId1 } = addPlayer('Mage', ['cardId1', 'cardId2', 'cardId3'], 'Bob');
    const action2 = { playerId: playerId2 } = addPlayer('Druid', ['cardId1', 'cardId2', 'cardId3'], 'Tom');
    let gameState = game(undefined, action1);
    expect(gameState).to.eql({
      players: [playerId1],
      activePlayer: 0,
    });
    gameState = game(gameState, action2);
    expect(gameState).to.eql({
      players: [playerId1, playerId2],
      activePlayer: 0,
    });
    // it should not add more than 2 players
    gameState = game(gameState, action2);
    expect(gameState.players).to.have.lengthOf(2);
  });
});
