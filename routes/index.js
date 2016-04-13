var express = require('express');
var models = require('../models/index');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

router.post('/articles', function(req, res) {
  models.Article.create({
    title: req.body.title,
    url: req.body.url
  }).then(function(article) {
    res.json(article);
  });
});

// router.post('/keywords', function(req, res) {

//   models.Keyword.create({
//     word: req.body.word,
//     frequency: req.body.frequency;
//   }).then(function(keyword) {
//     res.json(keyword);
//   });
// });


router.post('/keywords', function(req, res) {
  for (var word in req.body.keywords) { 
    models.Keyword.create({
      word: word,
      frequency: req.body.keywords[word]
    
  })}
});

module.exports = router;
