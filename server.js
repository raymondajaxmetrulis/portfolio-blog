require('dotenv').config();

var app = require('./app');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://nyjfrtzqiyosgx:0fd4ec500fa4747cd8bc1ba4bec588bcec50ab8b4c29887aeb2e8f9de7380905@ec2-107-21-236-219.compute-1.amazonaws.com:5432/dcvkelnn8bu7qc');

module.exports = app;