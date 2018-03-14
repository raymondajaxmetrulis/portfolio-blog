const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(require('less-middleware')(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '/static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var portfolioRoute = require('./routes/portfolio');
var blogRoute = require('./routes/blog');
var postRoute = require('./routes/post');

app.use('/portfolio', portfolioRoute);
app.use('/blog', blogRoute);
app.use('/swoop', postRoute);

const port = process.env.PORT || 3000;
app.listen(port);


module.exports = app;