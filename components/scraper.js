var request = require('request');
var cheerio = require('cheerio');
var models = require('../models/index');
var parseForKeywords = require('./parse_for_keywords');
var scraperHelper = require('../public/assets/scraper_helper.json');
var scraperHelperHash = scraperHelper[0];
var scraperHelperDomains = Object.keys(scraperHelperHash);

function scraper(url, accountId, categoryId) {
  console.log("inside scraper")

  function expandUrl(url) {
    // shortened URLs are 25 characters and under typically
    if (url.length <= 25) {
      request( { method: "HEAD", url: url, followAllRedirects: true },
        function (error, response) {
        scrapeURL(response.request.href);
      });
    } else {
      scrapeURL(url);
    }
  }

  function scrapeURL(url) {
    var title_html = 'head title';
    var content_html = 'p';  

    var domainRes = url.match(/\w*.(com|ca|co.uk)/g);
    if (domainRes) {
      var domain = domainRes[0];
    };

    if (scraperHelperHash[domain]) {
      title_html = scraperHelperHash[domain].title;
      content_html = scraperHelperHash[domain].content;
    };

    request(url, function (error, response, html) {

      if (!error && response.statusCode == 200) {

        var $ = cheerio.load(html);
        var title = $(title_html).text();
        var content = $(content_html).text();

        var keywords = parseForKeywords(content);

        models.Article.create({
          title: title,
          url: url,
          AccountId: accountId,
          CategoryId: categoryId
        })
        .then(function(article) {
          keywords.forEach(function (word) {
          
            if (word.frequency > 2) {
              
              models.Keyword.create({
                word: word.text,
                frequency: word.frequency,
                ArticleId: article.id,
                AccountId: article.AccountId,
                CategoryId: article.CategoryId
              });
            };
            
          });
        });   
      }
      else {
        console.log(error);
      };    
    });
  }

  expandUrl(url);
};

module.exports = scraper;
