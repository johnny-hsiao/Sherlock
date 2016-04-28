// var accounts = require('../public/assets/accounts');
var accounts = require('../public/assets/twitter_accounts');
var models = require('../models/index');

var categories = accounts[0];

// create categories first then accounts
for (var category in categories) {

  models.Category.create({
    name: category
  })
  // .then(function (category) {
  //   categories[category.name].forEach(function (screen_name) {
  //     models.Account.create({
  //       screen_name: screen_name,
  //       CategoryId: category.id
  //     });
  //   });
  // });

};