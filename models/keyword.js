'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    word: DataTypes.STRING,
    frequency: DataTypes.INTEGER,
    ArticleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here  
        Keyword.belongsTo(models.Article);
        Keyword.belongsTo(models.Account);
        Keyword.belongsTo(models.Category);
      }
    }
  });
  return Keyword;
};