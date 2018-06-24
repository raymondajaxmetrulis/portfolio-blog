require('dotenv').config();

var app = require('./app');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres@localhost:1234/postgres' || process.env.CONN_STRING);

module.exports = app;