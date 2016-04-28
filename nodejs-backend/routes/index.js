var express = require('express');
var router = express.Router();
var models = require('../models/index');
// var scraper = require('../components/scraper');
var twitter = require('../components/twitter');
var scrapeGenerator = require('../components/scrape_generator');


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                /    (root)

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Analytics' });
});


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

router.post('/categories/new', function(req, res, next) {
  console.log(req.body);
  models.Category.create({
    name: req.body.name
  })
  .then(function (newCategory) {
    res.json({ newCategory: newCategory })
  })
});

router.get('/categories/:category_id/accounts', function(req, res, next) {
  models.sequelize.query(
         `SELECT acc.id AS id, acc.screen_name AS screen_name, cat.name AS category
          FROM "Accounts" AS acc
          JOIN "Categories" AS cat
          ON acc."CategoryId" = cat.id
          WHERE cat.id = ${req.params.category_id};`
  )
  .then(function (results, metadata) {
    res.json(results[0]);
  });
});

router.get('/categories/:category_id/word_cloud', function(req, res, next) {
  models.sequelize.query(
         `SELECT word AS text, SUM(frequency) AS size 
          FROM "Keywords"
          WHERE "CategoryId" = ${req.params.category_id}
          GROUP BY text
          ORDER BY size DESC
          LIMIT 50;`
  )
  .then(function (results, metadata) {
    res.json(results[0]);
  });
});

router.get('/categories/:category_id/articles', function(req, res, next) {
  models.sequelize.query(
         `SELECT art.id AS id, art.title AS title, art.url AS url, acc.screen_name AS screen_name
          FROM "Articles" AS art
          JOIN "Accounts" AS acc
          ON art."AccountId" = acc.id
          WHERE art."CategoryId" = ${req.params.category_id}
          ORDER BY art."createdAt" DESC
          LIMIT 30;`
  )
  .then(function (results, metadata) {
    res.json(results[0]);
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

router.post('/categories/:category_id/accounts/new', function(req, res, next) {
  models.Account.create({
    screen_name: req.body.screen_name,
    CategoryId: req.params.category_id
  })
  .then(function (newAccount) {
    _twitterAPICallAndInitScrape(newAccount, newAccount.category_id);
    res.json({ newAccount: newAccount })
  })
});


// /categories/${ this.props.currentCategory }/accounts/new`, { screen_name: this.refs.accountInput.value }


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                                                /accounts

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


router.get('/accounts/:account_id/word_cloud', function(req, res, next) {
  models.sequelize.query(
         `SELECT word AS text, SUM(frequency) AS size 
          FROM "Keywords"
          WHERE "AccountId" = ${req.params.account_id}
          GROUP BY text
          ORDER BY size DESC
          LIMIT 30;`
  )
  .then(function (results, metadata) {
    res.json(results[0]);
  });
});

router.get('/accounts/:account_id/articles', function(req, res, next) {
  models.sequelize.query(
         `SELECT art.id AS id, art.title AS title, art.url AS url, acc.screen_name AS screen_name
          FROM "Articles" AS art
          JOIN "Accounts" AS acc
          ON art."AccountId" = acc.id
          WHERE art."AccountId" = ${req.params.account_id}
          ORDER BY art."createdAt" DESC
          LIMIT 50;`
  )
  .then(function (results, metadata) {
    res.json(results[0]);
  });
});

router.get('/accounts/:account_id/word_line/:word', function (req, res, next) {
  models.Keyword.findAll({
    where: {
      AccountId: req.params.account_id,
      word: req.params.word
    }
  })
  .then(function (keywords) {
    var sortedByDate = {};
    
    keywords.forEach(function (keyword) {

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

                                                /articles

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

router.get('/articles/:article_id', function(req, res, next) {
  models.Article.findAll({
    where: {id: req.params.article_id}
  })
  .then(function (article) {
    res.json(article);
  });
});

module.exports = router;



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

                                                helper methods

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

var _twitterAPICallAndInitScrape = function (account, CategoryId) {
  twitter.get('statuses/user_timeline', {screen_name: account.screen_name, count: 100}, function(error, tweets, response){
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