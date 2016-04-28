'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    emotionTone: DataTypes.TEXT,
    writingTone: DataTypes.TEXT,
    socialTone: DataTypes.TEXT,
    AccountId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Article.hasMany(models.Keyword);
        Article.belongsTo(models.Account);
      }
    }
  });
  return Article;
};