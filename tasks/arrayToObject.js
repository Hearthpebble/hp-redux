// get the old array, store it in json variable
let cards = require('../data/oldCardsArray.json');
const fs = require('fs');

// map array and change id to uppercase
cards = cards.map(card => Object.assign({}, card, { id: card.id.toUpperCase() }));

// sort the array by id
cards.sort((a, b) => {
  const idA = a.id;
  const idB = b.id;

  if (idA > idB) {
    return 1;
  }
  if (idA < idB) {
    return -1;
  }

  // if id's are equal
  return 0;
});

// new object to write
const newCards = {};

// iterate through the array and add to new object
cards.forEach((card) => {
  newCards[card.id] = card;
});

// stringify the new object
const newCardsPretty = JSON.stringify(newCards, null, 2);

// write the object to a file
fs.writeFile('../data/cards.json', newCardsPretty, (err) => {
  if (err) {
    throw err;
  }
});
