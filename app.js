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

app.use('/', portfolioRoute);
app.use('/blog', blogRoute);
app.use(process.env.POST_ROUTE, postRoute);

app.listen(3000, ()=> {
  console.log('Listening on port 3000')
});

module.exports = app;