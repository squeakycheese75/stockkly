/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mockData = require('./mockData');
// const mockData = require("./mockDataEmpty");

const {
  transactions,
  products,
  watchlist,
  wallet,
  profile,
  prices,
  pricesHistorical,
} = mockData;
const data = JSON.stringify({
  transactions,
  products,
  watchlist,
  wallet,
  profile,
  prices,
  pricesHistorical,
});
const filepath = path.join(__dirname, 'db.json');

fs.writeFile(filepath, data, function (err) {
  err ? console.error(err) : console.log('Mock DB created.');
});
