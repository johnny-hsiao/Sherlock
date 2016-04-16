// var scrape = require('./scrape');
// var accounts = require('./accounts');
var scrapeGenerator = require('./scrape_generator');
// var models = require('../models/index');

// var results = scrape('http://www.sportsnet.ca/basketball/nba/kobes-60-steals-show-memorable-swan-songs-sports-history/', 10)

// var results = scrape('http://cbc.ca', 6)


// getAccountId("jadande");
// getAccountId("julian");

scrapeGenerator("faisal", ["http://thesco.re/23ImS77", 
          "http://www.sportsnet.ca/basketball/nba/kobes-60-steals-show-memorable-swan-songs-sports-history/", 
          "http://blog.twg.ca/2015/12/twg-year-in-review-2015/"]);

// models.Account.findOrCreate({
//   where: {screen_name: "trevor"}
// }).spread(function(account, created) {
//   return account.dataValues.id;
// }).then(function (accountId) {
//   scrape('http://thesco.re/23ImS77', accountId);
// })








// tech twitter accounts source
// var results = parser('http://www.businessinsider.com/100-best-tech-people-on-twitter-2014-2014-11?op=1')

// finance twtitter accounts source
// var results = parser('http://www.businessinsider.com/finance-people-to-follow-on-twitter-2014-9?op=1')

// sports twitter accounts source
// var results = parser('http://www.si.com/sports-illustrated/twitter-100-2014')

// console.log(accounts);