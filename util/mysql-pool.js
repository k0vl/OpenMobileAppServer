var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'u_open_server',
  password        : 'da1ff6442e36a1d023aaeb98f1ca10de',
  database        : 'open_server',
  charset         : 'utf8mb4'
});

//inject database conenction as req.pool
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  req.pool = pool;
  next();
});

module.exports = router;