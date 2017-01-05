//dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var sqlPool = require('./util/mysql-pool');
var mainRouter = require('./routes/v1/v1-router');
var responseInitializer = require('./util/response-initializer');
var errorLogger = require('./util/error-logger');
var errorHandler = require('./util/error-handler'); //broken right now
var tokenVerifier = require('./util/token-verifier');

var app = express();

app.set('json spaces', 2);//if not set, the json will minify
app.set('env', 'development');//remove in production
app.set('jwt-secret', 'IvFxQ97ruUCV8OZC');
app.set('version', '/v1');

app.use(logger('dev'));
app.use(sqlPool);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(responseInitializer);
app.use(tokenVerifier);
app.use(app.get('version'), mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found (def)');
  err.status = 404;
  next(err);
});

app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
