var request = require('request');
var cheerio = require('cheerio');
var parseForKeywords = require('./parse_for_keywords');
var scraperHelper = require('../public/assets/scraper_helper.json');
var tone_analyzer = require('../components/watson');
var createArticlesAndKeywords = require('./create_articles_and_keywords');


var scraperHelperHash = scraperHelper[0];
var scraperHelperDomains = Object.keys(scraperHelperHash);

function scraper(url, date, accountId, categoryId) {

  function expandUrl(url) {
    // shortened URLs are 25 characters and under typically
    if (url.length <= 25) {
      request( { method: "HEAD", url: url, followAllRedirects: true },
        function (error, response) {
          if (response) {
            scrapeURL(response.request.href);
          }
        }
      );
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
    }

    if (scraperHelperHash[domain]) {
      title_html = scraperHelperHash[domain].title;
      content_html = scraperHelperHash[domain].content;
    }

    request(url, function (error, response, html) {

      if (!error && response.statusCode == 200) {

        var $ = cheerio.load(html);
        var title = $(title_html).text();
        var content = $(content_html).text();

        var keywords = parseForKeywords(content);
        var article_tone = ["", "", ""];
        // tone_analyzer.tone(
        //   { text: content },          
        //   function(err, tone) {
        //     if (err) {
        //       console.log(err);
        //     }
        //     else {
        //       var article_tone = tone.document_tone.tone_categories;
        //       // console.log(JSON.stringify(article_tone));
              
        //     }
        //   }
        // );
        createArticlesAndKeywords(title, url, date, article_tone, accountId, categoryId, keywords);
      }
      else {
        console.log(error);
      }  
    });
  }

  var ignoredDomains = url.match(/youtube.com|facebook.com|youtu.be|instagram.com|facebook.com|twitter.com|nytimes.com|nyti.ms/);

  if (!ignoredDomains) {
    expandUrl(url);
  }
}

module.exports = scraper;