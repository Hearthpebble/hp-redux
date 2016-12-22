// get the old array, store it in json variable
const json = require('../data/oldCardsArray.json');
const fs = require('fs');

// new object to write
const newJson = {};

// iterate through the array
for (let i = 0; i < json.length; i += 1) {
  newJson[json[i].id] = json[i];
}

// stringify the new object
const newJsonPretty = JSON.stringify(newJson, null, 2);

// write the object to a file
fs.writeFile('../data/cards.json', newJsonPretty, (err) => {
  if (err) {
    return console.log(err);
  }
});
