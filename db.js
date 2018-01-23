var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
const Blogs = require('./models/blog.js');
require('dotenv').config();

// Load DB config from config file
var config = require(path.join(__dirname, 'config', 'config.js'));

// Init sequelize with params from config file
console.log('Create sequelize...');
var sequelize = new Sequelize('postgres://postgres:' + process.env.LOCAL_DB_PW + '@localhost:1234/postgres');

// Empty db object to hold our models
var db = {};

fs.readdirSync(path.join(__dirname, 'models'))
.filter(function(file) {
	// load all files except index.js (this file)
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// For every model file, add the model to our db object
	var model = sequelize.import(path.join(__dirname, 'models', file));
	db[model.name] = model;
});

var Blog = sequelize.define('blogs', {
	title: Sequelize.TEXT,
	body: Sequelize.TEXT
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
  	db[modelName].associate(db)
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;