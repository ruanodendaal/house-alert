# House alert

A simple web scraper to alert me when a new house is added because "the early bird catches the worm"!

## Installation

```javascript
yarn install
```

## To use

#### Create your own .env file with:

* The url's you want to scrape
* Slackbot token (Add a bot https://my.slack.com/services/new/bot)
* Slack user you want to send the message to

#### Make some edits

All the fun happens in `scrape.js`

* Pass in a parameter object to the `findHouses()` function
  ```
  let developmentToTarget = {
    location: process.env.LOCATION_ONE,
    housesToMatch: 'some house name here',
    developmentSite: 'name of the site'
  };
  ```
* Update the `allHouses` variable with the html you want to target using the cheerio library
