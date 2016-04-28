var models = require('../models/index');
var scraper = require('./scraper');

function scrapeGenerator(screen_name, articleURLArray, CategoryId) {
  // given the screen_name; find id in Account table for screen_name or create a new account 
  models.Account.find({
    where: {screen_name: screen_name}
  })
  // given accountId returned, scraper each articleURL and associate them with accountId
  .then(function (account) {
    console.log(account);
    articleURLArray.forEach(function(articleURL) {
      scraper(articleURL.url, articleURL.date, account.id, account.CategoryId);
    });
  });
};

module.exports = scrapeGenerator;