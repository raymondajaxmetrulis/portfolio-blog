'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var blog = sequelize.define('blog', {
    title: {
      type: Sequelize.STRING,
      validate: {
        max: 100
      }
    },
    body: Sequelize.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return blog;
};