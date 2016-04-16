var accounts = require('../public/assets/accounts');
var models = require('../models/index');

var categories = accounts[0];

// create categories first then accounts

for (var category in categories) {
  console.log(category);
  models.Category.create({
    name: category
  }).then(function (category) {
    // console.log(category.id)
    categories[category.name].forEach(function (screen_name) {
      models.Account.create({
        screen_name: screen_name,
        CategoryId: category.id
      });
    });
  });  
};