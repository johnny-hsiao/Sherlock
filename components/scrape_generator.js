var models = require('../models/index');
var scraper = require('./scraper');

function scrapeGenerator(screen_name, articleURLArray, CategoryId) {
  // given the screen_name; find id in Account table for screen_name or create a new account 
  models.Account.findOrCreate({
    where: {screen_name: screen_name},
    defaults: {screen_name: screen_name, CategoryId: CategoryId}
  })
  .spread(function(account, created) {
    return {AccountId: account.dataValues.id, CategoryId: account.dataValues.CategoryId};
  })
  // given accountId returned, scraper each articleURL and associate them with accountId
  .then(function (accountInfo) {
    articleURLArray.forEach(function(articleURL) {
      scraper(articleURL, accountInfo.AccountId, accountInfo.CategoryId);
    });
  });
};

module.exports = scrapeGenerator;