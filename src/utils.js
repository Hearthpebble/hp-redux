const { Observable } = require('rx');

/**
 * Genertates a random integer
 *
 * @param {integer} min
 * @param {integer} max
 * @returns {integer}
 */
exports.randomInt = (min, max) =>
  Math.floor(Math.random() * ((max - min) + 1)) + min;


/**
 * Creates an observable from a redux store
 *
 * @param {Object} store
 * @returns {Observable} store
 */
exports.observableFromStore = store =>
  Observable.create(observer =>
    store.subscribe(() => observer.onNext(store.getState()))
  );

