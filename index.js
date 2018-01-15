require('dotenv').config();
import findHouses from './scrape';
const express = require('express');

const app = express();

let greatDenhamPark = {
  location: process.env.LOCATION_ONE,
  housesToMatch: 'henley|holden',
  developmentSite: 'Great Denham Park'
};

let ripleyView = {
  location: process.env.LOCATION_TWO,
  housesToMatch: 'holden',
  developmentSite: 'Ripley View'
};

app.get('/', function(req, res) {
  findHouses(greatDenhamPark);
  findHouses(ripleyView);
  res.send('Successful');
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Example app listening on port 8080!');
});
