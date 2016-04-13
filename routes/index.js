var express = require('express');
var router = express.Router();
var models = require('../models/index');
var parser = require('../components/scrape');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

router.post('/articles', function(req, res, next) {
  console.log("im in the router", req.body.url);
  var results = parser(req.body.url);
  // res.render('index', { title: 'Hello world' });
})

router.get('/keywords', function(req, res, next) {
  models.Keyword.findAll().then(function(keywords){
    // console.log(keywords);
    res.json(keywords);
  });
});

module.exports = router;
