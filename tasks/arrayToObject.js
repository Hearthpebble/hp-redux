// get the old array, store it in json variable
const json = require('../data/oldCardsArray.json');
const fs = require('fs');

// new object to write
const newJson = {};

// sort the array by id
json.sort((a, b) => {
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

// iterate through the array
json.forEach((i) => {
  newJson[i.id] = i;
});

// stringify the new object
const newJsonPretty = JSON.stringify(newJson, null, 2);

// write the object to a file
fs.writeFile('../data/cards.json', newJsonPretty, (err) => {
  if (err) {
    throw (err);
  }
});
