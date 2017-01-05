
/**
 * Fires when minion's health drops below 0
 *
 * @param {Observable} store$
 * @returns {Observable} minionDied$
 */
exports.minionDied$ = store$ =>
  store$
    .distinctUntilChanged(state => state.minions.minionsById)
    .concatMap(state => Object.keys(state.minions.minionsById)
      .filter(minionId => state.minions.minionsById[minionId].health === 1)
    );
