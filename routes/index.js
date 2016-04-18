var express = require('express');
var router = express.Router();
var models = require('../models/index');
// var scraper = require('../components/scraper');
var twitter = require('../components/twitter');
var scrapeGenerator = require('../components/scrape_generator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Analytics' });
});

/* POST an article with a URL;  URL is passed to the scraper */
// router.post('/articles', function(req, res, next) {
//   console.log("im in the router", req.body.url);
//   var results = scraper(req.body.url);
// });

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                /keywords

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


/* GET all keywords from db */
router.get('/keywords', function(req, res, next) {
  models.Keyword.findAll().then(function(keywords){
    _formattedKeywordsForWordCloud(keywords, res);
  });
});

/* DELETE all keywords from first 500 items in DB */
// router.delete('/keywords', function(req, res, next) {
//   models.Keyword.min('id').then(function(start) {

//     for (var i = start; i < start+500; i++) {
//       models.Keyword.destroy({
//         where: {id: i}
//       });
//     }

//   });
// });


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                /twitter

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

// For screen_name, make a twitter API call and initialize the scrape generator for each URL found in tweets
router.get('/twitter/:screen_name', function(req, res, next) {
  _twitterAPICallAndInitScrape(req.params, req.query.CategoryId);
});


// For a given category, find all accounts in the DB with that category, and get their tweets and scrape any URLs found in tweets 
router.get('/twitter/:category/scrape_all', function(req, res, next) {
  
  // Find category in DB given a category name
  models.Category.findOne({
    where: { name: req.params.category }
  })

  // Find all accounts in DB given the CategoryId
  .then(function (cat) {
    models.Account.findAll({
      where: { CategoryId: cat.id }
    })
    // For each account's screen_name, make a twitter API call and initialize the scrape generator for each URL found in tweets
    .then(function (accounts) {
      accounts.forEach(function (account) {
        _twitterAPICallAndInitScrape(account, account.CategoryId);
      });
    });
  });

});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                /categories

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

router.get('/categories', function(req, res, next) {
  models.Category.findAll()
  .then(function (categories) {
    res.json({ categories: categories });
  });
});

// router.get('/categories/:category_id/accounts', function(req, res, next) {
//   models.Account.findAll({ 
//     where: { CategoryId: req.params.category_id } 
//   })
//   .then(function (accounts) {
//     res.json({ accounts: accounts });
//   });
// });

router.get('/categories/:category_id/word_cloud', function(req, res, next) {
  models.Keyword.findAll({
    where: {CategoryId: req.params.category_id}
  })
  .then(function (keywords) {
    _formattedKeywordsForWordCloud(keywords, res);
  });
});

router.get('/categories/:category_id/word_line/:word', function (req, res, next) {
  models.Keyword.findAll({
    where: {
      CategoryId: req.params.category_id,
      word: req.params.word
    }
  })
  .then(function (keywords) {
    var sortedByDate = {};
    
    keywords.forEach(function (keyword) {
      // var year = keyword.tweetDate.getFullYear();
      // var month = keyword.tweetDate.getMonth();
      // var day = keyword.tweetDate.getDate();
      // var tweetDate = new Date(year,month,day);

      var str = String(keyword.tweetDate).split(' ');
      var dateInt = Math.ceil(Date.parse(keyword.tweetDate)/86400000);
      var tweetDate = str[2]+'-'+str[1]+'-' + str[3][2] + str[3][3];
      
      if (sortedByDate[dateInt]) {
        sortedByDate[dateInt].frequency += keyword.frequency;
      }
      else {
        sortedByDate[dateInt] = { date: tweetDate, frequency: keyword.frequency };
      }
    });

    res.json({ keywords: sortedByDate });
  });
});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                helper methods

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

var _twitterAPICallAndInitScrape = function (account, CategoryId) {
  twitter.get('statuses/user_timeline', {screen_name: account.screen_name, count: 200}, function(error, tweets, response){
    if (!error && (typeof tweets != 'string') ) {

      var urlsArray = [];
      tweets.forEach(function(tweet) {
        var urls = tweet.entities.urls;
        if (urls[0]) {
          urlsArray.push({
            url: urls[0].expanded_url,
            date: tweet.created_at
          });
        }
      });

      scrapeGenerator(account.screen_name, urlsArray, CategoryId);
    }
  });
};

var _formattedKeywordsForWordCloud = function(keywords, res) {
  var aggregatedKeywords = {};
  var formattedKeywords = [];

  keywords.forEach(function(keyword) {
    if (aggregatedKeywords[keyword.word]) {
      aggregatedKeywords[keyword.word] += keyword.frequency;
    }
    else {
      aggregatedKeywords[keyword.word] = keyword.frequency;
    }
  });

  for (var word in aggregatedKeywords) {
    formattedKeywords.push({ 
      text: word, 
      size: aggregatedKeywords[word]/10
    });
  }

  res.json(formattedKeywords);
};

module.exports = router;