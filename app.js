//dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var sqlpool = require('./util/mysql-pool');

//routes
var mainRouter = require('./routes/v1/v1-router');

var app = express();

//formats the output
app.set('json spaces', 2);

app.set('env', 'development');

app.use(logger('dev'));
app.use(sqlpool);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routing
app.use('/v1', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var response = {};
  response.message = err.message;
  response.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json(response);
});

module.exports = app;
