// var accounts = require('../public/assets/accounts');
var accounts = require('../public/assets/twitter_accounts');
var models = require('../models/index');

var categories = accounts[0];

// create categories first then accounts

models.User.create({
  first_name: "Admin",
  last_name: "Admin",
  email: "admin@sherlock.com",
  username: "admin",
  password: "admin"
})
.then(function(user){
  for (var category in categories) {

    models.Category.create({
      name: category,
      UserId: user.id
    });
  }
});
