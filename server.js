require('dotenv').config();

var app = require('./app');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.CONN_STRING);

module.exports = app;