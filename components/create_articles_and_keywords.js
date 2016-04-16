var models = require('../models/index');

var createArticlesAndKeywords = function (title, url, article_tone, accountId, categoryId, keywords) {
  models.Article.create({
    title: title,
    url: url,
    emotionTone: JSON.stringify(article_tone[0].tones),
    writingTone: JSON.stringify(article_tone[1].tones),
    socialTone: JSON.stringify(article_tone[2].tones),
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
};

module.exports = createArticlesAndKeywords;