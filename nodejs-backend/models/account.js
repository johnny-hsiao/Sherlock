'use strict';
module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    screen_name: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Account.hasMany(models.Article);
        Account.hasMany(models.Keyword);
        Account.belongsTo(models.Category);
      }
    }
  });
  return Account;
};