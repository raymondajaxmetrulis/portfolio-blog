const express = require('express');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
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

app.use('*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found Okay');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error('PROD ERROR')
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error('DEV ERROR')
    res.json({
      message: err.message,
      error: {}
    });
  });
}

const port = process.env.PORT || 3000;
app.listen(port);


module.exports = app;