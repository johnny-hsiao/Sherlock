var express = require('express');
var router = express.Router();
var models = require('../models/index');
// var scraper = require('../components/scraper');
var twitter = require('../components/twitter');
var scrapeGenerator = require('../components/scrape_generator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

/* POST an article with a URL;  URL is passed to the scraper */
// router.post('/articles', function(req, res, next) {
//   console.log("im in the router", req.body.url);
//   var results = scraper(req.body.url);
// });

/* GET all keywords from db */
router.get('/keywords', function(req, res, next) {
  models.Keyword.findAll().then(function(keywords){
    // console.log("im in routes keywords", keywords)
    var aggregatedKeywords = {};

    keywords.forEach(function(keyword) {
      if (aggregatedKeywords[keyword.word]) {
        aggregatedKeywords[keyword.word] += keyword.frequency;
      }
      else {
        aggregatedKeywords[keyword.word] = keyword.frequency;
      }
    });

    var formattedKeywords = [];
    for (var word in aggregatedKeywords) {
      formattedKeywords.push({ 
        text: word, 
        size: aggregatedKeywords[word] 
      });
    }

    res.json(formattedKeywords);
  });
});

/* DELETE all keywords from first 500 items in DB */
router.delete('/keywords', function(req, res, next) {
  models.Keyword.min('id').then(function(start) {

    for (var i = start; i < start+500; i++) {
    models.Keyword.destroy({
      where: {id: i}
    });
    }
  });
});

router.get('/twitter/:screen_name', function(req, res, next) {
  console.log("in twitter routes", req)
  twitter.get('statuses/user_timeline', {screen_name: req.params.screen_name, count: 200}, function(error, tweets, response){
    if (!error) {
      console.log("Im inside get twitter in routes/index");
      // console.log(tweets);
      var urlsArray = [];
      tweets.forEach(function(tweet) {
        // console.log(tweet);
        var urls = tweet.entities.urls;
        if (urls[0]) {
          console.log(urls[0].expanded_url);
          urlsArray.push(urls[0].expanded_url);
        }
      });
      scrapeGenerator(req.params.screen_name, urlsArray, req.query.CategoryId);
      res.json({
        tweets: tweets
      });
    }
  });
});


router.get('/categories', function(req, res, next) {
  var categories = models.Category.findAll()
  .then(function (categories) {
    res.json({
      categories: categories
    });
  });
});

router.get('/categories/:category_id/accounts', function(req, res, next) {
  var accounts = models.Account.findAll({
    where: {CategoryId: 3}
  }).then(function (accounts) {
    res.json({
      accounts: accounts
    });
  });
});

router.get('/categories/:category_id/word_cloud', function(req, res, next) {
  var accounts = models.Account.findAll({
    where: {CategoryId: 3}
  }).then(function (accounts) {
    res.json({
      accounts: accounts
    });
  });
});




module.exports = router;
