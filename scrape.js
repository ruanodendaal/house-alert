require('dotenv').config();
const request = require('request');
const cheerio = require('cheerio');
const SlackBot = require('slackbots');
const express = require('express');

let greatDenhamPark = {
  location: process.env.LOCATION_ONE,
  housesToMatch: 'henley|winstone',
  developmentSite: 'Great Denham Park'
};

let ripleyView = {
  location: process.env.LOCATION_TWO,
  housesToMatch: 'winstone',
  developmentSite: 'Ripley View'
};

// ********************

function findHouses(args) {
  request.get(
    {
      url: args.location,
      headers: {
        'User-Agent': 'Some crazy browser'
      }
    },
    function(err, resp, body) {
      var $ = cheerio.load(body);

      // store
      let totalHomes = $('.propertySearchHeader.plotResultsHeader h2').text();

      // fetch all house for sale
      let allHouses = $('#searchResultsWrapper').text();

      // search for the house names I'm interested in
      let re = new RegExp(args.housesToMatch, 'gi');
      let found = allHouses.match(re);

      // send slack alert
      if (found != null) {
        console.log(`I've found one in "${args.developmentSite}", it's a "${found}", url: ${args.location}`);

        // create and send your bot the settings and house builder details
        var settings = {
          token: process.env.SLACK_TOKEN,
          name: 'house-hunter'
        };
        var details = {
          totalHomes: totalHomes,
          location: args.location,
          matchedHouse: found,
          developmentSite: args.developmentSite,
          userToMessage: process.env.SLACK_USR
        };

        sendMessage(settings, details);
      }
    }
  );
}

function sendMessage(settings, details) {
  var bot = new SlackBot(settings);

  bot.on('start', function() {
    bot.postMessageToUser(details.userToMessage, `There are ${details.totalHomes}`);

    bot.postMessageToUser(
      details.userToMessage,
      `I've found one!! \n Site: "${details.developmentSite}", \n House name: "${
        details.matchedHouse
      }" \n url: ${details.location}`
    );
  });

  console.log('finished');
}

const app = express();

app.get('/', function(req, res) {
  findHouses(greatDenhamPark);
  findHouses(ripleyView);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
