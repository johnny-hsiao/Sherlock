'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Article.hasMany(models.Keyword);
      }
    }
  });
  return Article;
};