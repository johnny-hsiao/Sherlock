var request = require('request');
var cheerio = require('cheerio');
var models = require('../models/index');
var keywordFrequency = require('./keywords')

function parseURL(url) {

  request(url, function (error, response, html) {
    var metaData;
    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);
      var title = $('head title').text();
      var body = $('body').text();
      var keywords = keywordFrequency(body);

      models.Article.create({
        title: title,
        url: url
      }).then(function(article) {
        keywords.forEach(function (word) {
        
          if (word.frequency > 2) {
            
            models.Keyword.create({
              word: word.text,
              frequency: word.frequency,
              ArticleId: article.id
            });
          }
          
        })
      })
        
      
      

      metaData = {
        title: title,
        keywords: keywords,
        url: url,
        date: Date.now()
      }

      
    }
    else {
      console.log(error);
    }

    // console.log(metaData);
    
  })

}

module.exports = parseURL;
