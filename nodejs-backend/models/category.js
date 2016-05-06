'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Category.hasMany(models.Account);
        Category.hasMany(models.Article);
        Category.hasMany(models.Keyword);
        Category.belongsTo(models.User);
      }
    }
  });
  return Category;
};